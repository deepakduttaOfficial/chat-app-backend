import * as dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import "./config/env.config";
import "./config/db.config";

// Cors config file
import corsOption from "./config/cors.config";

// Routes
import Auth from "./routes/auth.route";

// Passport js config file
import "./config/passport.config";
import passport from "passport";

const app: Express = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket: Socket) => {
  console.log("A new client connected");

  // Emit a message to the connected client
  socket.emit("connect", {
    message: "Welcome! You are now connected to the server.",
  });
  
  socket.on("message", (data) => {
    console.log("Received message:", data);
  });
});

// Middleware
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Routes Middleware
app.use(`/api/auth`, Auth);

// default route
app.get("/", (_, res) => {
  res.send("Hello World");
});

export default server;
