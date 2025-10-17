import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { product, tone } = await req.json();
    if (!product) {
      return NextResponse.json({ error: "Missing product" }, { status: 400 });
    }

    const prompt = `Generate 3 short, catchy ad headlines for the following product. Make them ${
      tone || "neutral"
    } in tone. Product: ${product}`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a creative advertising assistant.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.8,
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: err }, { status: response.status });
    }

    const data = await response.json();
    const assistant = data.choices?.[0]?.message?.content || "";
    const lines = assistant
      .split(/\n+/)
      .map((l) => l.replace(/^\d+\.?\s*/, "").trim())
      .filter(Boolean);

    return NextResponse.json({ lines });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
