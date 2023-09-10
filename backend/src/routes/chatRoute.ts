import express from 'express';
import { createChat, findAllChatsOfUser, findChatForUsers } from '../controllers/chatController';

const chatRouter = express.Router();

chatRouter.post('/create', createChat);
chatRouter.get('/all/:id', findAllChatsOfUser);
chatRouter.get('/find', findChatForUsers);

export default chatRouter;