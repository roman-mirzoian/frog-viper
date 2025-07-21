import { Server, Socket } from "socket.io";
import express from "express";
import http from "http";
import { getLocalIPAddress } from "@/helpers";
import db from "@/db";

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const userNameMap: { [key: string]: string } = {};
let mainViewId = '';

io.on("connection", (socket) => {
  const deviceId = getDeviceId(socket);

  console.log("--------------------");
  console.log("a user connected: ", deviceId);
  console.log("--------------------");

  io.emit("getOnlineUsers", Object.values(userNameMap));
  console.log(userNameMap);

  socket.on("connectUser", (userName: string) => {
    if(userName === "main") {
      mainViewId = socket.id;
    } else {
      userNameMap[deviceId] = userName;
    }

    console.log("userNameMap", userNameMap);
    io.emit("getOnlineUsers", userNameMap);
  });

  socket.on('start', (data) => {
    const players = getOnlinePlayersId();
    console.log('Game started', players);
    console.log('MainViewId', getMainViewId());
    db.prepare(
      `UPDATE game_state SET state = 'started', currentRound = 0`
    ).run();
    io.to(getMainViewId()).emit('start', getOnlinePlayersName());
  });

  socket.on('nextRound', (data) => {
    console.log('Next round:', data);
    io.to(getMainViewId()).emit('nextRound', data);
  });

  socket.on('showResult', (data) => {
    console.log('Show result', data);
    io.to(getMainViewId()).emit('showResult', data);
  })

  socket.on('end', (data) => {
    db.prepare(
      `UPDATE game_state SET state = 'not_started', currentRound = 0`
    ).run();
    console.log('Game ended', data);
    io.to(getMainViewId()).emit('end', data);
  });

  socket.on("manualDisconnect", () => {
    delete userNameMap[deviceId];
    io.emit("getOnlineUsers", Object.values(userNameMap));
    socket.disconnect(true);

    console.log("--------------------");
    console.log("a user disconnected: ", deviceId);
    console.log("--------------------");
  });
});

server.listen(PORT, () => {
  const ip = getLocalIPAddress();
  console.log(`Server running on: ${ip}:${PORT}...`);
});

export { io, app };

function getOnlinePlayersId() {
  return Object.keys(userNameMap).join(", ");
}

function getOnlinePlayersName() {
  return Object.values(userNameMap);
}

function getMainViewId() {
  return mainViewId;
}

function getDeviceId(socket: Socket) {
  return socket.handshake.auth.deviceId;
}