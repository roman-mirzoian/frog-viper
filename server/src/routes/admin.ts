import { Router, Request, Response } from 'express';
import db from "../db";

const router = Router();

router.post('/add-quiz', async (req: Request, res: Response) => {
  const { blockName, imageLinks, questions, videoLinks } = req.body;

  if (
    typeof blockName !== 'string' ||
    !Array.isArray(imageLinks) ||
    !Array.isArray(questions) ||
    !Array.isArray(videoLinks)
  ) {
    res.status(400).json({ error: 'Invalid quiz data format.' });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO quizes (blockName, imageLinks, questions, videoLinks)
      VALUES (?, ?, ?, ?)
    `);

    stmt.run(
      blockName,
      JSON.stringify(imageLinks),
      JSON.stringify(questions),
      JSON.stringify(videoLinks)
    );

    res.status(200).json({ message: 'Quiz added successfully.' });
  } catch (err) {
    console.error('Error inserting quiz:', err);
    res.status(500).json({ error: 'Database error.' });
  }
});

router.get('/quizes', (req: Request, res: Response) => {
  const quizes = db
    .prepare('SELECT * FROM quizes ORDER BY id DESC')
    .all() as { id: number, blockName: string, imageLinks: string, questions: string, videoLinks: string }[];
  res.status(200).json(quizes);
});

router.post('/select-quiz', (req: Request, res: Response) => {
  const { quizId } = req.body;

  try {
    const result = db
      .prepare('UPDATE game_state SET currentQuestionBlock = ? WHERE id = 1')
      .run(quizId.toString());

    if (result.changes === 0) {
      res.status(404).json({ error: 'Не вдалося оновити блок питання' });
      return;
    }

    res.status(200).json({ message: 'Блок питання успішно оновлений' });
  } catch (error) {
    console.error('Error updating quiz block:', error);
    res.status(500).json({ error: 'Виникла помилка при оновленні' });
  }
});

router.get('/get-quiz/:quizId', (req: Request, res: Response) => {
  const { quizId } = req.params;
  const quiz = db
    .prepare('SELECT * FROM quizes WHERE id = ?')
    .get(quizId) as { id: number, blockName: string, imageLinks: string, questions: string, videoLinks: string };
  res.status(200).json(quiz);
});

router.post('/delete-quiz', (req: Request, res: Response) => {
  const { quizId } = req.body;
  const stmt = db.prepare('DELETE FROM quizes WHERE id = ?');
  stmt.run(quizId);
  res.status(200).json({ message: 'Quiz deleted successfully.' });
});

router.get('/users', (req: Request, res: Response) => {
  const users = db
    .prepare('SELECT * FROM users ORDER BY id DESC')
    .all();
  res.status(200).json(users);
})

export default router;