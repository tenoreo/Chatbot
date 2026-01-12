import express from "express";
import processQuery from "../controllers/chatController.js";
import verificarToken from "../utils/auth.js";

const router = express.Router();

router.post("/query", verificarToken, processQuery);

router.get("/", verificarToken, (req, res) => {
  res.send("Welcome to the REST API!");
});

export default router;
