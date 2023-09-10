import { Request, Response } from "express";
import { logError } from "../helpers/errorHelper";
import { ErrorFactory } from "../factories/errorFactory";
import { ChatService } from "../services/chatService";
import { ChatModelFull } from "../models/chatModel";
import { UserService } from "../services/userService";

const ChatManagerFunction = () => {
  const createChat = async(request: Request, response: Response) => {
    const chat: ChatModelFull = request.body;

    try {
      let usersResponse = await UserService.findAll(chat.members!);
      
      if(!usersResponse.success) return response.status(400).json(usersResponse);

      let res = await ChatService.create(chat);

      if(!res.success) return response.status(400).json(res);

      return response.status(200).json(res);
    }catch(error) {
      logError('Error happened ChatManager.CreateChat', error);
      return response.status(500).json(ErrorFactory.create500Error(error));
    }
  };

  const findChats = async(request: Request, response: Response) => {
    const { id } = request.params;

    try {
      let res = await ChatService.findChats(parseInt(id));

      return response.status(200).json(res);
    }catch(error) {
      logError('Error happened in ChatManager.FindChats.', error);
      return response.status(500).json(ErrorFactory.create500Error(error));
    }
  };

  const findChat = async(request: Request, response: Response) => {
    const chat: ChatModelFull = request.body;

    try {
      let res = await ChatService.findChat(chat);

      if(!res.success) return response.status(400).json(res);

      return response.status(200).json(res);
    }catch(error) {
      logError('Error happened in ChatManager.FindChat.', error);
      return response.status(500).json(ErrorFactory.create500Error(error));
    }
  };

  return {
    createChat,
    findChats,
    findChat
  }
};

export const ChatManager = ChatManagerFunction();