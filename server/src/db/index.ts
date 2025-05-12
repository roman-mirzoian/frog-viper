import Database from 'better-sqlite3';

export interface GameRow {
  state: string;
}

const db = new Database('app.db');

db.prepare(`
  CREATE TABLE IF NOT EXISTS game_state (
    id INTEGER PRIMARY KEY,
    state TEXT NOT NULL,
    currentRound INTEGER NOT NULL,
    currentView TEXT NOT NULL,
    currentQuestionBlock TEXT
  )
`).run();

db.prepare(`
  INSERT OR IGNORE INTO game_state (id, state, currentRound, currentView, currentQuestionBlock)
  VALUES (1, 'not_started', 0, 'not_selected', 'not_selected')
`).run();

db.prepare(`
    CREATE TABLE IF NOT EXISTS quizes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      blockName TEXT NOT NULL,
      imageLinks TEXT,
      questions TEXT,
      videoLinks TEXT
    )
`).run();

export default db;
