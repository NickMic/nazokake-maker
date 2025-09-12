import { Router } from 'express';
import { supabase } from '../supabaseClient';

const router = Router();

router.post('/', async (req, res) => {
  const { riddleId, score, comment, userId } = req.body;

  const { data, error } = await supabase
    .from('evaluations')
    .insert([
      {
        riddle_id: riddleId,
        score,
        comment,
        user_id: userId,
        created_at: new Date().toISOString()
      }
    ]);

  if (error) {
    console.error('Supabase insert error:', error);
    return res.status(500).json({ error: '評価の保存に失敗しました' });
  }

  res.json({ message: '評価を保存しました', data });
});

export default router;