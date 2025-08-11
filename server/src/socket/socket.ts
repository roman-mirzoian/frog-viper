import { Server } from "socket.io";
import express from "express";
import http from "http";
import { getLocalIPAddress, logInfo } from "@/helpers";
import { getDeviceId } from "@/socket/helpers";
import {
  emitConnectedUsers,
  endGame,
  getCurrentUsersState,
  insertUserNameWithDeviceId,
  manualDisconnect,
  nextRound,
  nextRoundPreview,
  showPlayerInput,
  showPlayerVote,
  showResult,
  startGame,
} from "@/socket/commands";

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const userNameMap: Record<string, string> = {};
let mainViewId = '';

io.on("connection", (socket) => {
  const deviceId = getDeviceId(socket);

  logInfo('a user connected', deviceId);

  io.emit("getOnlineUsers", Object.values(userNameMap));

  socket.on("connectUser", (userName: string) => {
    if(userName === "main") {
      mainViewId = socket.id;
      logInfo('main view connected', mainViewId)
    } else {
      userNameMap[deviceId] = userName;
      insertUserNameWithDeviceId(deviceId, userName);
    }

    emitConnectedUsers(userNameMap);
    getCurrentUsersState();
  });

  socket.on("reconnectMain", () => {
    mainViewId = socket.id;
    logInfo('main view reconnected', mainViewId);
  });

  socket.on('start', () => {
    startGame(userNameMap, mainViewId);
  });

  socket.on('nextRound', (data) => {
    nextRound(data, mainViewId);
  });

  socket.on('nextRoundPreview', (data) => {
    nextRoundPreview(data, mainViewId);
  });

  socket.on('showPlayerInput', () => {
    showPlayerInput();
  });

  socket.on('showPlayerVote', () => {
    showPlayerVote();
  });

  socket.on('showResult', (data) => {
    showResult(data, mainViewId);
  });

  socket.on('currentPlayersState', () => {
    getCurrentUsersState();
  });

  socket.on('end', (data) => {
    endGame(data, mainViewId);
  });

  socket.on("manualDisconnect", () => {
    manualDisconnect(socket, deviceId, userNameMap);
  });
});

server.listen(PORT, () => {
  const ip = getLocalIPAddress();
  logInfo(`Server running on: ${ip}:${PORT}...`, {});
});

export { io, app };

