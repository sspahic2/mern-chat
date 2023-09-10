import express, { Express } from 'express';
import cors from 'cors';
import authRouter from './routes/authRoute';
import userRouter from './routes/userRoute';
import cookieParser from "cookie-parser";
import chatRouter from './routes/chatRoute';
import messageRouter from './routes/messageRoute';
import http from 'http';
import { Server } from 'socket.io'
import { UserModelFull } from './models/userModel';

const app: Express = express();

const corsOpts = {
  origin: process.env.FRONTEND_URL ?? 'http://localhost:5173',
  methods: [
    'GET',
    'POST',
    'OPTIONS'
  ],
  allowedHeaders: [
    'Content-Type',
  ],
  credentials: true
};

const server = http.createServer(app);
const io = new Server(server, { cors: corsOpts });

app.use(cors(corsOpts));
app.use(express.json());
app.use(cookieParser())

app.get('/test', (req, res) => {
  res.status(200).json('Test working.');
});

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRouter);

let chatRooms: {id: number, socketId: string}[] = [];

const sockets = new Map<string, number>();

io.on('connection', (socket) => {
  socket.on('newUserJoined', async (data: { chatIds: number[], user: number }) => {
    if(!data.chatIds || !data.user ) return;
    sockets.set(socket.id, data.user);
    socket.join(data.chatIds.map(t => `room${t}`));
    io.to(data.chatIds.map(t => `room${t}`)).emit('onlineUsers', Array.from(sockets.values()));
  });

  socket.on('disconnect', () => {
    let rooms = Array.from(io.sockets.adapter.sids.get(socket.id) ?? []);
    for(var room in rooms) {
      socket.leave(room);
    }
    sockets.delete(socket.id);
    io.to(rooms).emit('onlineUsers', Array.from(sockets.values()));
  });

  socket.on('sendMessage', (message: { text: string, chatId: number, senderId: number }) => {
    io.to(`room${message.chatId}`).emit('getMessage', message);
  });

});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

export default {};