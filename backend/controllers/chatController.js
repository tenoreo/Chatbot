import pool from "../utils/dbAuth.js";
import normalizedMessage from "../utils/matcher.js";

const handleChat = async (req, res) => {
  const { message } = req.body;
  const getTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  try {
    const listKeywords = normalizedMessage(message);
    if (listKeywords.length === 0) {
      return res.json({
        matched: false,
        response:
          "No logré entender tu consulta. Puedo ayudarte con horarios, ubicación, servicios, precios o contacto.",
        timeStamp: getTime(),
      });
    }
    const { rows } = await pool.query(
      `SELECT * FROM search_faq_by_keywords($1);`,
      [listKeywords]
    );
    const match = rows.length > 0 ? rows[0] : null;
    let responseData;
    if (!match) {
      responseData = {
        matched: false,
        response:
          "No logré entender tu consulta. Puedo ayudarte con horarios, ubicación, servicios, precios o contacto.",
        timeStamp: getTime(),
      };
    } else {
      responseData = {
        matched: true,
        question: match.question,
        response: match.response,
        timeStamp: getTime(),
      };
    }

    // Guardar log
    await pool.query(
      `INSERT INTO log (message_question, understood, matched_question, matched_response)
       VALUES ($1, $2, $3, $4)`,
      [
        message,
        responseData.matched,
        responseData.matched ? responseData.question : null,
        responseData.matched ? responseData.response : null,
      ]
    );

    return res.json(responseData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default handleChat;
