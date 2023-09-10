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
    return await new Promise((resolve, reject) => {
      let newMessage: MessageModel = {
        id: findMax() + 1,
        chatId: message.chatId!,
        senderId: message.senderId!,
        text: message.text!,
        createdAt: new Date()
      };

      messages.push(newMessage);
      resolve(newMessage);
    });
  };

  const findByChatId = async(chatId: number): Promise<MessageModel[]> => {
    return await new Promise((resolve, reject) => {
      let existingMessages = messages.filter((msg) => msg.chatId == chatId);
      resolve(existingMessages);
    });
  }

  return {
    create,
    findByChatId
  }
};

export const MessageRepository = MessageRepositoryFunction();