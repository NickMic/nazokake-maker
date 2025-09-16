import type { NextApiRequest, NextApiResponse } from 'next';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY as string;

type GenerateRequest = {
  theme: string;
  style?: string;
  difficulty?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { theme, style = '標準', difficulty = '普通' } = req.body as GenerateRequest;

  if (!theme || typeof theme !== 'string') {
    return res.status(400).json({ error: 'テーマが必要です' });
  }

  const prompt = buildPrompt(theme, style, difficulty);

  try {
    const response: Response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4', // 必要に応じて 'gpt-5' に変更
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8,
        max_tokens: 200,
      }),
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content?.trim();

    const result = typeof content === 'string' && content
      ? content
      : `◯◯とかけて、◯◯と解く。その心は、◯◯です。`;

    return res.status(200).json({ result });
  } catch (error) {
    console.error('💥 OpenAI APIエラー:', error);
    return res.status(500).json({ error: 'エラーが発生しました' });
  }
}

function buildPrompt(theme: string, style: string, difficulty: string): string {
  return `あなたは日本語の「なぞかけ職人」です。
以下の条件に従って、ユーモアと知性を込めたなぞかけを1つ生成してください。
【テーマ】${theme}
【スタイル】${style}
【難易度】${difficulty}
形式：「◯◯とかけて、◯◯と解く。その心は、◯◯です。」
※出力はこの形式に従ってください。説明や補足は不要です。`;
}
