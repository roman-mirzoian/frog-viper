import { Router, Request, Response } from 'express';
import db, { GameRow } from "../db";

const router = Router();

router.post('/start', (req: Request, res: Response) => {
  const state = req.body;

  if (!state) {
    res.status(400).json({ error: 'Missing state' });
  }

  db.prepare('INSERT INTO game_state (state) VALUES (?)').run(JSON.stringify(state));
  res.status(200).json({ success: true });
});

router.get('/stop', (req: Request, res: Response) => {
  const row = db
    .prepare('SELECT state FROM game_state ORDER BY updated_at DESC LIMIT 1')
    .get() as GameRow;

  if (!row) {
    res.status(404).json({ error: 'No saved state' });
  }

  res.status(200).json(JSON.parse(row.state));
});

export default router;
