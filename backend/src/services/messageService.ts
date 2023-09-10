import ServiceResponse from "../DTO/serviceResponse";
import { ErrorFactory } from "../factories/errorFactory";
import { ChatHelper } from "../helpers/chatHelper";
import { logError } from "../helpers/errorHelper";
import { MessageHelper } from "../helpers/messageHelper";
import { MessageModelFull } from "../models/messageModel";
import { MessageRepository } from "../repositories/messageRepository";

const MessageServiceFunction = () => {
  const create = async(message: MessageModelFull): Promise<ServiceResponse> => {
    let validationResponse = MessageHelper.checkIfValidDataWasProvided(message);

    if(!validationResponse.success) return { ...validationResponse, data: message };

    try {
      let newMessage = await MessageRepository.create(message);

      return {
        success: true,
        message: 'Message created.',
        data: newMessage
      };
    }catch(error) {
      logError('Error happened while creating message.', error);
      return ErrorFactory.createServiceError('Error happened while creating message.');
    }
  };

  const findByChatId = async(chatId: number): Promise<ServiceResponse> => {
    let validationResponse = ChatHelper.checkIfValidIdWasProvided(chatId);

    if(!validationResponse.success) return { ...validationResponse, data: chatId };
    
    try {
      let existingMessages = await MessageRepository.findByChatId(chatId);

      return {
        success: true,
        message: 'Search completed.',
        data: existingMessages
      };
    }catch(error) {
      logError('Error happened while finding messages.', error);
      return ErrorFactory.createServiceError('Error happened while finding messages.');
    }
  }

  return {
    create,
    findByChatId
  }
};

export const MessageService = MessageServiceFunction();