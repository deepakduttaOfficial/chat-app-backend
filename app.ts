import * as dotenv from "dotenv";
dotenv.config();
import { app, express, io, server } from "./config/socket.io.config";
import { Socket } from "socket.io";
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";
import "./config/env.config";
import "./config/db.config";

// Cors config file
import corsOption from "./config/cors.config";

// Routes
import Auth from "./routes/auth.route";

// Passport js config file
import "./config/passport.config";
import { chatSocket } from "./socket/chat.socket";

// Middleware
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cookieParser());

// Routes Middleware
app.use(`/api/auth`, Auth);

// default route
app.get("/", (_, res) => {
  res.send("Hello World");
});

// Socket io connection
const onConnection = (socket: Socket) => {
  chatSocket(io, socket);
};

io.on("connection", onConnection);

export default server;
