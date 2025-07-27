import { Router, Request, Response } from 'express';
import db from "../db";
import { getCurrentUsersState } from "@/socket/commands";

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

  getCurrentUsersState();

  res.status(200).json({ success: true });
});

router.get('/options', (req: Request, res: Response) => {
  const { deviceId } = req.query;

  const rows = db.prepare(`
      SELECT deviceId, roundAnswer FROM users
      WHERE deviceId != ?
    `).all(deviceId);

  getCurrentUsersState();

  res.status(200).json(rows);
});

router.post('/vote', (req: Request, res: Response) => {
  const { playerDeviceId } = req.body;

  db.prepare(`
      UPDATE users
      SET score = score + 1
      WHERE deviceId = ?
  `).run(playerDeviceId);

  getCurrentUsersState();

  res.status(200).json({ success: true });
});

export default router;