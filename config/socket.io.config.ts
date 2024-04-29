import http from "http";
import express, { Express } from "express";
import { Server } from "socket.io";
import envConfig from "./env.config";

const app: Express = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: envConfig.DOMAIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

export { io, server, app, express };
