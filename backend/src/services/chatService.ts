import ServiceResponse from "../DTO/serviceResponse";
import { ErrorFactory } from "../factories/errorFactory";
import { ChatHelper } from "../helpers/chatHelper";
import { logError } from "../helpers/errorHelper";
import { ChatModelFull } from "../models/chatModel";
import { ChatRepository } from "../repositories/chatRepository";

const ChatServiceFunction = () => {
  const create = async(chat: ChatModelFull): Promise<ServiceResponse> => {
    let validationResult = ChatHelper.checkIfAllProvidedIdsAreValid(chat);

    if(!validationResult.success)
      return { ...validationResult, data: chat };

    try {
      let existingChat = await ChatRepository.find(chat);

      if(existingChat)
        return {
          success: true,
          message: 'Chat already exists.',
          data: existingChat
        };

      let newChat = await ChatRepository.create(chat);

      return {
        success: true,
        message: 'Chat created.',
        data: newChat
      };
    }catch(error) {
      logError('Error happened while creating chat.', error);
      return ErrorFactory.createServiceError('Error happened while creating chat.');
    }
  };

  const findChats = async(id: number): Promise<ServiceResponse> => {
    let validationResult = ChatHelper.checkIfValidIdWasProvided(id);

    if(!validationResult.success) return { ...validationResult, data: id };

    try {
      let existingChats = await ChatRepository.findAllChatsForUser(id);

      return {
        success: true,
        message: 'Search completed.',
        data: existingChats
      };
    }catch(error) {
      logError('Error happened while finding chats.', error);
      return ErrorFactory.createServiceError('Error happened while finding chats.');
    }
  };

  const findChat = async(chat: ChatModelFull): Promise<ServiceResponse> => {
    let validationResult = ChatHelper.checkIfAllProvidedIdsAreValid(chat);

    if(!validationResult.success)
      return { ...validationResult, data: chat };

    try {
      let existingChat = await ChatRepository.find(chat);
      
      if(!existingChat)
        return {
          success: false,
          message: 'No chat exists between provided user ids.',
          data: chat
        };
      return {
        success: true,
        message: 'Chat found.',
        data: existingChat
      };
    }catch(error) {
      logError('Error happened while finding chat.', error);
      return ErrorFactory.createServiceError('Error happened while finding chat.');
    }
  };

  const findChatByChatId = async(chatId: number): Promise<ServiceResponse> => {
    try{
      let existingChat = await ChatRepository.findById(chatId);

      if(!existingChat) {
        return {
          success: false,
          message: "Chat doesn't exist.",
          data: chatId
        };
      }

      return {
        success: true,
        message: 'Chat found.',
        data: existingChat
      };
    }catch(error) {
      logError('Error happened while finding chat.', error);
      return ErrorFactory.createServiceError('Error happened while finding chat.');
    }
  }

  return {
    create,
    findChats,
    findChat,
    findChatByChatId
  }
};

export const ChatService = ChatServiceFunction();