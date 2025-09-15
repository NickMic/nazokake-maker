import type { NextApiRequest, NextApiResponse } from 'next';

// 環境変数からAPIキーを取得（.env.local に OPENAI_API_KEY を設定）
const OPENAI_API_KEY = process.env.OPENAI_API_KEY as string;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('📩 APIリクエスト受信:', req.method, req.body);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    // OpenAI API呼び出し例（Chat Completions）
    console.log('APIキー存在確認:', !!OPENAI_API_KEY);
    const response: Response = await fetch('https://api.openai.com/v1/chat/completions', {
    console.log('外部APIステータス:', response.status);
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-5', // モデルは必要に応じて変更
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('💥 外部APIエラー:', errText);
      return res.status(500).json({ error: 'Failed to generate text' });
    }

    const data = await response.json();
    const generatedText = data.choices?.[0]?.message?.content?.trim() || '';

    console.log('✅ 生成結果:', generatedText);

    return res.status(200).json({ result: generatedText });
  } catch (error) {
    console.error('💥 サーバーエラー:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
