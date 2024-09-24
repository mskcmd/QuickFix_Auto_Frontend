import { useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000'; // Adjust this to match your backend URL

export const useSocket = (userId: string, role: 'user' | 'mechanic') => {
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    socket.current = io(SOCKET_URL);

    socket.current.emit("setup", { id: userId, role });

    socket.current.on("connected", () => {
      console.log("Socket connected");
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [userId, role]);

  return socket.current;
};