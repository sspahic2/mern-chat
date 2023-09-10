import MessageModel from "../models/messageModel";
import { Database } from "../models/supabase";

const convertToMessageModel = (message: Database['public']['Tables']['message']['Row']): MessageModel => {
  return {
    id: message.id,
    senderId: message.senderId!,
    chatId: message.chatId!,
    text: message.text!,
    createdAt: new Date(message.created_at)
  };
};

const convertToMessageModelArray = (messages: Database['public']['Tables']['message']['Row'][]): MessageModel[] => {
  let result: MessageModel[] = [];
  messages.forEach((ele) => result.push(convertToMessageModel(ele)));
  return result;
};

export { convertToMessageModel, convertToMessageModelArray };