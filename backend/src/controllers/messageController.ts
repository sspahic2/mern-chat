import { Request, Response } from "express";
import { UserManager } from "../managers/userManager";
import { logError } from "../helpers/errorHelper";
import { ChatManager } from "../managers/chatManager";
import { ErrorFactory } from "../factories/errorFactory";
import { MessageManager } from "../managers/messageManager";

const createMessage = async(req: Request, res: Response) => {
  try {
    return await MessageManager.createMessage(req, res);
  }catch(error) {
    logError('Error happened in MessageManager.CreateMessage.', error);
    return res.status(500).json(ErrorFactory.create500Error(error));
  }
};

const getMessages = async(req: Request, res: Response) => {
  try {
    return await MessageManager.getMessages(req, res);
  }catch(error) {
    logError('Error happened in MessageController.GetMessages', error);
    return res.status(500).json(ErrorFactory.create500Error(error));
  }
};

export { createMessage, getMessages };