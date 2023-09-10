import { Request, Response } from "express";
import { MessageModelFull } from "../models/messageModel";
import { logError } from "../helpers/errorHelper";
import { ErrorFactory } from "../factories/errorFactory";
import { ChatService } from "../services/chatService";
import { UserService } from "../services/userService";
import { MessageService } from "../services/messageService";

const MessageManagerFunction = () => {
  const createMessage = async (request: Request, response: Response) => {
    const message: MessageModelFull = request.body;

    try {
      let chatResult = await ChatService.findChatByChatId(message.chatId!);

      if(!chatResult.success) return response.status(400).json(chatResult);

      let userResult = await UserService.findByID(message.senderId!);

      if(!userResult.success) return response.status(400).json(userResult);

      let res = await MessageService.create(message);

      if(!res.success) return response.status(400).json(res);

      return response.status(200).json(res);
    }catch(error) {
      logError('Error happened in MessageManager.CreateMessage', error);
      return response.status(500).json(ErrorFactory.create500Error(error));
    }
  };

  const getMessages = async(request: Request, response: Response) => {
    const { chatId } = request.params;

    try {
      let chatResult = await ChatService.findChatByChatId(parseInt(chatId));

      if(!chatResult.success) return response.status(400).json(chatResult);

      let res = await MessageService.findByChatId(parseInt(chatId));

      return response.status(200).json(res);
    }catch(error) {
      logError('Error happened in MessageManager.GetMessages', error);
      return response.status(500).json(ErrorFactory.create500Error(error));
    }
  };

  return {
    createMessage,
    getMessages
  };
};

export const MessageManager = MessageManagerFunction();