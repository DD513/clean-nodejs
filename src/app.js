import express from "express";
import http from "http";
import cookieParse from "cookie-parser";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import passport from "passport";
import session from "express-session";
import index from "./routes/index"; // 用來 存放route的接口

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParse());
app.use(express.static(path.resolve(__dirname, "../view")));
app.use(morgan("dev"));
app.use(cors());

app.use(
  session({
    secret: process.env.APP_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", index); // 後面要建立到routus/index.js才能使用

const server = http.createServer(app);
const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log("App is running on port " + port);
});

server.on("listening", () => {
  const addr = server.address();
  console.log(`This server is on ${addr.port}`);
});
