import { Server, Socket } from "socket.io";
import {
  chatConnection,
  chatDisconnection,
  sampleChatEvent,
} from "./service/service.socket";

const chatSocketConnection = (io: Server, socket: Socket) => {
  io.use((socket, next) => {
    console.log(socket.handshake, "token");
    next()
  })
  // chat Connection
  chatConnection(socket);

  // Chat disconnection
  chatDisconnection(socket);

  // Sample message event
  sampleChatEvent(socket, io);
};

export default chatSocketConnection;
