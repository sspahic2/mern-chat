import ChatModel from "../models/chatModel";
import { Database } from "../models/supabase";

const convertToChatModel = (chat: Database['public']['Tables']['chat']['Row']): ChatModel => {
  return { id: chat.id, createdAt: new Date(chat.created_at), members: chat.members! };
};

const convertToChatModelArray = (chats: Database['public']['Tables']['chat']['Row'][]): ChatModel[] => {
  let result: ChatModel[] = [];
  chats.forEach((ele) => {
    result.push(convertToChatModel(ele));
  });
  return result;
}

export { convertToChatModel, convertToChatModelArray };