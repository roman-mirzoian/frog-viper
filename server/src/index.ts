import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { app } from "./socket/socket";
import gameRoute from "@/routes/game";
import adminRouter from "@/routes/admin";
import userRouter from "@/routes/user";
import "./utils/keepAlive";

dotenv.config();

app.use(cors());
app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('✅ Pong');
});

app.use('/game', gameRoute);
app.use('/admin', adminRouter);
app.use('/users', userRouter);
