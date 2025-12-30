const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function rewriteWithLLM(original, ref1, ref2) {
  const prompt = `
You are a professional content writer.

Original article:
${original}

Reference articles:
1. ${ref1}
2. ${ref2}

Task:
Rewrite the original article with better structure, clarity, and SEO.
Do not copy text directly.
Add headings and improve readability.

At the end, add a "References" section listing both sources.
`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7
  });

  return response.choices[0].message.content;
}

module.exports = rewriteWithLLM;
