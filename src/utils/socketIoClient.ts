import { io, Socket } from "socket.io-client";

export const socketIoClient = () => {
  const token: string | null = localStorage.getItem("accessToken");
  if (token) {
    const socket: Socket = io("http://localhost:3001", {
      transports: ["websocket"],
      auth: { token: `Bearer ${token}` },
    });
    return socket;
  }
  return null
};
