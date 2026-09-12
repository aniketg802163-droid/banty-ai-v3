import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MODEL = process.env.OPENAI_MODEL || "gpt-5.6-luna";

if (!process.env.OPENAI_API_KEY) {
  console.warn("OPENAI_API_KEY is not set. Add it as a server environment variable.");
}

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(express.json({ limit: "1mb" }));
app.use(express.static("public"));

app.post("/api/chat", async (req, res) => {
  try {
    const message = String(req.body?.message || "").trim();

    if (!message) {
      return res.status(400).json({ error: "Message खाली है।" });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(503).json({
        error: "AI API अभी connect नहीं है। Server में OPENAI_API_KEY सेट करें।"
      });
    }

    const response = await client.responses.create({
      model: MODEL,
      instructions:
        "You are Banty AI, a helpful, friendly AI assistant. Reply in the user's language. " +
        "For Hindi users, prefer simple Hindi and explain clearly.",
      input: message
    });

    res.json({ reply: response.output_text || "मुझे अभी जवाब नहीं मिला।" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "AI से जवाब लेते समय समस्या हुई। Server/API settings जाँचें।"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Banty AI V3 running on http://localhost:${PORT}`);
});
