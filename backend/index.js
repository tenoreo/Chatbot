import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chatRoute.js";

const app = express();
const port = process.env.PORT || 3001;

// --- Middlewares ---
app.use(cors()); // Permite peticiones desde otros dominios
app.use(express.json()); // Sustituto moderno de BodyParser para JSON

app.use("/api/chat", chatRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
