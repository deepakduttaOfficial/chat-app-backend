import { Server, Socket } from "socket.io";

export const chatSocket = (io: Server, socket: Socket) => {
  io.on("connection", (socket) => {
    console.log("a user connected");
  });
};
