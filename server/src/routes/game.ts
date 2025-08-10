import { Router, Request, Response } from 'express';
import db, { GameRow } from "../db";
import { extractDriveFileId } from "@/helpers";
import axios from "axios";

const router = Router();

router.post('/start', (req: Request, res: Response) => {
  const state = req.body;

  if (!state) {
    res.status(400).json({ error: 'Missing state' });
  }

  db.prepare('INSERT INTO game_state (state) VALUES (?)').run(JSON.stringify(state));
  res.status(200).json({ success: true });
});

router.get('/info', (req: Request, res: Response) => {
  const row = db
    .prepare('SELECT * FROM game_state')
    .get() as GameRow;
  res.status(200).json(row);
})

router.get('/stop', (req: Request, res: Response) => {
  const row = db
    .prepare('SELECT state FROM game_state ORDER BY updated_at DESC LIMIT 1')
    .get() as GameRow;

  if (!row) {
    res.status(404).json({ error: 'No saved state' });
  }

  res.status(200).json(JSON.parse(row.state));
});

router.get("/image", async (req: Request, res: Response) => {
  const url = req.query.url as string;

  if (!url) {
    return res.status(400).send("Missing url parameter");
  }

  const fileId = extractDriveFileId(url);
  if (!fileId) {
    return res.status(400).send("Invalid Google Drive URL");
  }

  try {
    const response = await axios.get(
      `https://drive.google.com/uc?export=view&id=${fileId}`,
      { responseType: "arraybuffer" }
    );

    const contentType = response.headers["content-type"] || "image/jpeg";
    res.setHeader("Content-Type", contentType);
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching image from Google Drive:", error);
    res.status(500).send("Failed to fetch image");
  }
});

export default router;
