import { Router, Request, Response } from 'express';
import db from "../db";

const router = Router();

router.get('/:quizId', (req: Request, res: Response) => {
  const { quizId } = req.params;

  const quiz = db
    .prepare('SELECT * FROM quizes WHERE id = ?')
    .get(quizId) as { id: number, blockName: string, imageLinks: string, questions: string, videoLinks: string };

  res.status(200).json(quiz);
});

export default router;