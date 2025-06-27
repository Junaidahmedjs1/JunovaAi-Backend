import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST method allowed" });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const { message } = req.body;
    const result = await model.generateContent([message]);
    const text = result.response.text();

    return res.status(200).json({ reply: text });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
