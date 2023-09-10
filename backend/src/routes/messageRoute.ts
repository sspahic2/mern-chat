import express from 'express';
import { createChat, findAllChatsOfUser, findChatForUsers } from '../controllers/chatController';
import { createMessage, getMessages } from '../controllers/messageController';

const messageRouter = express.Router();

messageRouter.post('/create', createMessage);
messageRouter.get('/find/:chatId', getMessages);

export default messageRouter;