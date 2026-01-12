"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircleMore, SendHorizontal, X } from "lucide-react";

import styles from "./FAB.module.css";

const FAB = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [input, setInput] = useState("");
  const getTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const [messages, setMessages] = useState([
    {
      text: "¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte?",
      sender: "bot",
      type: "response",
      timeStamp: getTime(),
    },
  ]);
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll al último mensaje
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, thinking]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      text: input,
      sender: "user",
      type: "msg",
      timeStamp: getTime(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setThinking(true);

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_CODE}`,
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          text: data.response,
          sender: "bot",
          type: "response",
          timeStamp: data.timeStamp,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          text: "Error al conectar con el servidor.",
          sender: "bot",
          type: "error",
          timeStamp: getTime(),
        },
      ]);
    } finally {
      setThinking(false);
    }
  };

  return (
    <div className={styles.chatWrapper}>
      {/* Ventana de Chat */}
      {isOpen && (
        <div
          className={`${styles.chatContainer} ${isOpen ? "open" : "closed"}`}
        >
          <div className={styles.chatHeader}>
            <span>Asistente Virtual</span>
            <button
              onClick={() => setIsOpen(false)}
              className={styles.closeBtn}
            >
              <X />
            </button>
          </div>

          <div className={styles.chatMessages} ref={scrollRef}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${styles.message} ${styles[msg.sender]} ${
                  msg.type === "error" ? styles["errorMessage"] : ""
                }`}
              >
                {msg.text}
                <br/>
                <span>{msg.timeStamp}</span>
              </div>
            ))}
            {thinking && (
              <div
                className={`${styles.message} ${styles.bot} ${styles.typing}`}
              >
                Escribiendo...
              </div>
            )}
          </div>

          <form className={styles.chatInput} onSubmit={sendMessage}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu consulta..."
            />
            <button type="submit">
              <SendHorizontal />{" "}
            </button>
          </form>
        </div>
      )}

      {/* Botón Flotante */}
      <button className={styles.chatTrigger} onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.icon}>
          <MessageCircleMore />
        </span>
      </button>
    </div>
  );
};

export default FAB;
