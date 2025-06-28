const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();

// ✅ Allow only your frontend domain from Hostinger
app.use(cors({
  origin: "https://grey-sparrow-597965.hostingersite.com"
}));

app.use(express.json());

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek-ai/deepseek-coder:free",
        messages: [
          { role: "system", content: "You are NLP Coach Bot. Help users with mental wellness." },
          { role: "user", content: userMessage }
        ]
      })
    });

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content || "No reply from AI.";
    res.json({ reply });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log("✅ Server running on port 3000"));
