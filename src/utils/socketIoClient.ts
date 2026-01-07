import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const socketIoClient = (): Socket | null => {
  if (socket) return socket;

  socket = io("http://localhost:3001", {
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionAttempts: 5,
    withCredentials: true,
  });

  return socket;
};
