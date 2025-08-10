import { io } from "@/socket/socket";
import { Socket } from "socket.io";
import db from "@/db";
import { getMainViewId, getOnlinePlayersId, getOnlinePlayersName } from "@/socket/helpers";
import { logInfo } from "@/helpers";

export function insertUserNameWithDeviceId(deviceId: string, userName: string) {
  db.prepare(`
      INSERT INTO users (deviceId, name, score, roundAnswer)
      VALUES (?, ?, ?, ?)
          ON CONFLICT(deviceId) DO UPDATE SET
          name = excluded.name, 
          score = excluded.score,
          roundAnswer = excluded.roundAnswer
  `).run(deviceId, userName, 0, '');
}


export function emitConnectedUsers(userNameMap: Record<string, string>) {
  logInfo('Connected users', userNameMap);
  io.emit("getOnlineUsers", userNameMap);
}

export function startGame(userNameMap: Record<string, string>, mainViewId: string) {
  const players = getOnlinePlayersId(userNameMap);

  logInfo('Game started', players);
  logInfo('MainViewId', getMainViewId(mainViewId));

  db.prepare(
    `UPDATE game_state SET state = 'started', currentRound = 0`
  ).run();
  io.to(getMainViewId(mainViewId)).emit('start', getOnlinePlayersName(userNameMap));
}

export function nextRound(data: any, mainViewId: string) {
  logInfo('Next round', data);
  db.prepare(
    `UPDATE game_state SET currentRound = ?`
  ).run(data);
  io.to(getMainViewId(mainViewId)).emit('nextRound', data);
}

export function showPlayerInput() {
  io.emit('showPlayerInput');
}

export function showPlayerVote() {
  io.emit('showPlayerVote');
}

export function showResult(data: any, mainViewId: string) {
  logInfo('Show result', data);
  io.to(getMainViewId(mainViewId)).emit('showResult', data);
}

export function getCurrentUsersState() {
  const usersState = db.prepare(`SELECT * FROM users`).all();
  io.emit('currentPlayersState', usersState);
}

export function endGame(data: any, mainViewId: string) {
  db.prepare(
    `UPDATE game_state SET state = 'not_started', currentRound = 0`
  ).run();
  logInfo('Game ended', data);
  io.to(getMainViewId(mainViewId)).emit('end', data);
}

export function manualDisconnect(socket: Socket, deviceId: string, userNameMap: Record<string, string>) {
  delete userNameMap[deviceId];
  io.emit("getOnlineUsers", Object.values(userNameMap));
  socket.disconnect(true);

  logInfo("a user disconnected", deviceId);
}