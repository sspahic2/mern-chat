import databaseContext from "../dbcontext/context";
import { convertToMessageModel, convertToMessageModelArray } from "../factories/messageFactory";
import MessageModel, { MessageModelFull } from "../models/messageModel";

const messages: MessageModel[] = []

const findMax = () => {
  let max = 0;
  messages.map((msg) => {
    if(msg.id > max)
      max = msg.id;
  });
  return max;
}

const MessageRepositoryFunction = () => {
  const create = async(message: MessageModelFull): Promise<MessageModel> => {
    const { data, error } = await databaseContext.from('message').insert(
      {
        chatId: message.chatId,
        senderId: message.senderId,
        text: message.text
      }
    ).select().single();

    if(error) throw error;

    return convertToMessageModel(data);
  };

  const findByChatId = async(chatId: number): Promise<MessageModel[]> => {
    const { data, error } = await databaseContext.from('message').select().eq('chatId', chatId);
    if(error) throw error;
    return convertToMessageModelArray(data);
  }

  return {
    create,
    findByChatId
  }
};

export const MessageRepository = MessageRepositoryFunction();