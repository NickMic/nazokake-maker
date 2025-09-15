import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('CDN-Cache-Control', 'no-store');
  res.setHeader('Vercel-CDN-Cache-Control', 'no-store');

  const keyword = req.query.keyword || '未入力';

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'あなたは日本語のなぞかけ職人です。お題に基づいてユーモラスななぞかけを1つ作ってください。',
        },
        {
          role: 'user',
          content: `お題: ${keyword}`,
        },
      ],
      max_tokens: 100,
    });

    const answer = completion.choices[0].message?.content?.trim() || '生成に失敗しました';
    res.status(200).json({ result: answer });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'AI生成中にエラーが発生しました' });
  }
}
