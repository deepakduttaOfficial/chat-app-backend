import { Server, Socket } from "socket.io";
import { userConnection, userDisconnection } from "./service/service.socket";

const userSocketConnection = (io: Server, socket: Socket) => {
  // user Connection
  userConnection(socket);

  // user disconnection
  userDisconnection(socket);
}


export default userSocketConnection;
