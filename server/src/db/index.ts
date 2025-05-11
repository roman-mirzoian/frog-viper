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
    currentView TEXT NOT NULL
  )
`).run();

export default db;
