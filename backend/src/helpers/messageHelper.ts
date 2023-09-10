import ValidationResponse from "../DTO/validationResponse";
import { MessageModelFull } from "../models/messageModel";

const MessageHelperFunction = () => {
  const checkIfValidDataWasProvided = (message: MessageModelFull): ValidationResponse => {
    if(!message.chatId || !message.senderId || !message.text)
      return {
        success: false,
        message: 'All fields are required.'
      };

    if(message.chatId <= 0)
      return {
        success: false,
        message: 'Invalid chat id provided.'
      };

    if(message.senderId <= 0)
      return {
        success: false,
        message: 'Invalid user id provided.'
      };

    return {
      success: true,
      message: 'Provided data is valid.'
    };
  };

  return {
    checkIfValidDataWasProvided
  }
};

export const MessageHelper = MessageHelperFunction();