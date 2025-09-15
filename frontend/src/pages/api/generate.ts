// frontend/src/pages/api/generate.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // キャッシュ無効化ヘッダー
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('CDN-Cache-Control', 'no-store');
  res.setHeader('Vercel-CDN-Cache-Control', 'no-store');

  // クエリからお題を取得
  const keyword = req.query.keyword || '未入力';

  // 仮のなぞかけ生成（後でAI呼び出しに置き換え）
  const nazokake = `「${keyword}」とかけまして、プログラミングと解きます。その心は…どちらも「バグ」がつきものです。`;

  res.status(200).json({ result: nazokake });
}
