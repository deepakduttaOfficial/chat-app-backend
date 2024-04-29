import { Server, Socket } from "socket.io";
import { CONNECTOR } from "../../../helpler/socket.connector";

export const chatConnection = (socket: Socket) => {
  console.log("Chat connected");
};

export const chatDisconnection = (socket: Socket) => {
  socket.on(CONNECTOR.CHAT_CONNECTION, () => {
    console.log("Chat disconnected");
  });
};

export const sampleChatEvent = (socket: Socket, io: Server) => {
  socket.on(CONNECTOR.SAMPLE_CHAT_EVENT, (data) => {
    console.log(data);
    io.emit(CONNECTOR.SAMPLE_CHAT_EVENT, data);
  });
}
