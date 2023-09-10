import databaseContext from "../dbcontext/context";
import { convertToChatModel, convertToChatModelArray } from "../factories/chatFactory";
import ChatModel, { ChatModelFull } from "../models/chatModel";

const ChatRepositoryFunction = () => {
  const find = async(chat: ChatModelFull): Promise<ChatModel | undefined> => {
    const { data, error } = await databaseContext.from('chat').select().eq('members', chat.members!).single();
    if(error) return undefined;
    return convertToChatModel(data!);
  };

  const create = async(chat: ChatModelFull): Promise<ChatModel> => {
    const { data, error } = await databaseContext.from('chat').insert({ members: chat.members }).select().single();
    if(error) throw error;
    return convertToChatModel(data!);
  };

  const findAllChatsForUser = async(id: number): Promise<ChatModel[]> => {
    const { data, error } = await databaseContext.from('chat').select().contains('members', `{${id.toString()}}`);
    if(error) throw error;
    return convertToChatModelArray(data!);
  };

  const findById = async(chatId: number): Promise<ChatModel | undefined> => {
    const { data, error } = await databaseContext.from('chat').select().eq('id', chatId).single();
    if(error) return undefined;
    return convertToChatModel(data!);
  };
  return {
    find,
    create,
    findAllChatsForUser,
    findById
  }
};

export const ChatRepository = ChatRepositoryFunction();