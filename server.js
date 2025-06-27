import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const result = await model.generateContent([message]);
    const text = result.response.text();
    res.json({ reply: text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default app;

