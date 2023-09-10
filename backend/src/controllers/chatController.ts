import { Request, Response } from "express";
import { UserManager } from "../managers/userManager";
import { logError } from "../helpers/errorHelper";
import { ChatManager } from "../managers/chatManager";
import { ErrorFactory } from "../factories/errorFactory";

const createChat = async(req: Request, res: Response) => {
  try {
    return await ChatManager.createChat(req, res);
  }catch(error) {
    logError('Error happened in ChatController.CreateChat.', error);
    return res.status(500).json(ErrorFactory.create500Error(error));
  }
};

const findAllChatsOfUser = async(req: Request, res: Response) => {
  try {
    return await ChatManager.findChats(req, res);
  }catch(error) {
    logError('Error happened in ChatController.FindAllChatsOfUser', error);
    return res.status(500).json(ErrorFactory.create500Error(error));
  }
};

const findChatForUsers = async(req: Request, res: Response) => {
  try {
    return await ChatManager.findChat(req, res);
  }catch(error) {
    logError('Error happened in ChatController.FIndChatForUsers.', error);
    return res.status(500).json(ErrorFactory.create500Error(error));
  }
}

export { createChat, findAllChatsOfUser, findChatForUsers };