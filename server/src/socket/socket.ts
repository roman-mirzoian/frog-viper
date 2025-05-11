import { Server } from "socket.io";
import express from "express";
import http from "http";

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
  console.log("--------------------");
  console.log("a user connected: ", socket.id);
  console.log("--------------------");

  io.emit("getOnlineUsers", Object.values(userNameMap));
  console.log(userNameMap);

  socket.on("connectUser", (userName: string) => {
    if(userName === "main") {
      mainViewId = socket.id;
    } else {
      userNameMap[socket.id] = userName;
    }

    console.log(userNameMap);
    io.emit("getOnlineUsers", userNameMap);
  });

  socket.on('start', (data) => {
    const players = getOnlinePlayersId();
    console.log('Game started', players);
    console.log(getMainViewId());
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

  socket.on('end', (data) => {});

  socket.on("disconnect", () => {
    console.log("--------------------");
    console.log("a user disconnected: ", socket.id);
    console.log("--------------------");
    delete userNameMap[socket.id];
    io.emit("getOnlineUsers", Object.values(userNameMap));
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
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