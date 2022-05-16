import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import routes from "./routes/index";

// middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

// node인데 왜 require를 안쓰지?

// Routes
app.use("/api", routes.authRouter);

// db연결
// require("./config/db")();
import "./config/db";

// server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`서버 돌아간다 ${PORT}에서`, PORT);
});
