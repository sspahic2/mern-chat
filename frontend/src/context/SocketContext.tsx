import { createContext, useEffect, useState } from "react";
import { UserFull } from "../types/User";
import { URL } from "../lib/socket";
import { Manager, Socket } from "socket.io-client";

export interface SocketContextState {
  socket: Socket | undefined;
  onlineUsers: number[];
  setOnlineUsers: (users: number[]) => void;
};

export const SocketContext = createContext<SocketContextState>({} as SocketContextState);

export const SocketContextProvider = ({ children, user }: { children: JSX.Element[], user: UserFull }) => {
  const [socket, setSocket] = useState<Socket>();
  const [onlineUsers, setOnlineUsers] = useState<number[]>([]);
  // const manager = new Manager(URL, { transports: ['websocket'], reconnection: true, forceNew: true });
  // const newSocket = manager.socket('/');

  useEffect(() => {
    if(user?.id == undefined) return;
    const manager = new Manager(URL, { transports: ['websocket'], reconnection: true, forceNew: true });
    const newSocket = manager.socket('/');
    manager.on('error', (error) => {
      // Fired upon a connection error.
      console.log('socket error', {error})
    })
  
    newSocket.on('connect_error', (error) => {
        // Fired when an namespace middleware error occurs.
        console.log('connection error', {error});
    });

    setSocket(newSocket);

    return () => {
      socket?.disconnect();
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket: socket, onlineUsers, setOnlineUsers }}>
      {children}
    </SocketContext.Provider>
  )
}