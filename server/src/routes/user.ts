import { Router, Request, Response } from 'express';
import db from "../db";

const router = Router();

router.post('/answer', (req: Request, res: Response) => {
  const { deviceId, answer } = req.body;

  if (!deviceId || !answer) {
    res.status(400).json({ error: 'Missing deviceId or answer' });
  }

  db.prepare(`
      UPDATE users
      SET roundAnswer = ?
      WHERE deviceId = ?
  `).run(answer, deviceId);

  res.status(200).json({ success: true });
});

export default router;