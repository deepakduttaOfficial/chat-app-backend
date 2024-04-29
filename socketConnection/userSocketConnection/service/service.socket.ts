import { Socket } from "socket.io";

export const userConnection = (socket: Socket) => {
  console.log("A user connected");
};

export const userDisconnection = (socket: Socket) => {
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
};
