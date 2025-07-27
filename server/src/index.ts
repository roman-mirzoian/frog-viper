import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { app } from "./socket/socket";
import path from "path";
import gameRoute from "@/routes/game";
import adminRouter from "@/routes/admin";
import userRouter from "@/routes/user";

dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/game', gameRoute);
app.use('/admin', adminRouter);
app.use('/users', userRouter);

const currentRootDir = __dirname.split("/").slice(0, -2).join("/");
const clientBuildDir = path.join(currentRootDir, "/client/dist");

app.use(express.static(clientBuildDir));

app.get("*", (req, res) => {
  res.sendFile(path.join(currentRootDir, "client", "dist", "index.html"));
});
