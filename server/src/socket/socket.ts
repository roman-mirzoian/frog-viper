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

io.on("connection", (socket) => {
  console.log("--------------------");
  console.log("a user connected: ", socket.id);
  console.log("--------------------");

  io.emit("getOnlineUsers", Object.values(userNameMap));
  console.log(userNameMap);

  socket.on("connectUser", (userName: string) => {
    userNameMap[socket.id] = userName;
    console.log(userNameMap);
    io.emit("getOnlineUsers", Object.values(userNameMap));
  });

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
