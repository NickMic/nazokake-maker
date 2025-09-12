import { Router } from 'express';

const router = Router();

router.post('/', async (req, res) => {
  const { topic } = req.body;

  // 仮のなぞかけ生成ロジック（後でAI連携に置き換え）
  const answer1 = `${topic}とかけて、カニととく。その心は？`;
  const answer2 = `どちらも「はさむ」のが得意でしょう。`;

  res.json({ answer1, answer2 });
});

export default router;