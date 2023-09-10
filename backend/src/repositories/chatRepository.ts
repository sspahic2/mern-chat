import ChatModel, { ChatModelFull } from "../models/chatModel";

const chats: ChatModel[] = [];

const findMax = () => {
  let max = 0;
  chats.map((chat) => {
    if(chat.id > max)
      max = chat.id;
  });
  return max;
}

const ChatRepositoryFunction = () => {
  const find = async(chat: ChatModelFull): Promise<ChatModel | undefined> => {
    return await new Promise((resolve, reject) => {
      let existingChat = chats.find((chatElement) => {
        let isInFirstList = chat.members?.every((a) => chatElement.members.includes(a));
        let isInSecondList = chatElement.members.every((b) => chat.members?.includes(b));

        if(isInFirstList && isInSecondList) return chatElement;
      });

      resolve(existingChat);
    });
  };

  const create = async(chat: ChatModelFull): Promise<ChatModel> => {
    return await new Promise((resolve, reject) => {
      let newChat: ChatModel = {
        id: findMax() + 1,
        members: chat.members!,
        createdAt: new Date()
      };

      chats.push(newChat);
      resolve(newChat);
    });
  };

  const findAllChatsForUser = async(id: number): Promise<ChatModel[]> => {
    return await new Promise((resolve, reject) => {
      resolve(chats.filter((chat) => chat.members.includes(id)));
    });
  };

  const findById = async(chatId: number): Promise<ChatModel | undefined> => {
    return await new Promise((resolve, reject) => {
      let existingChat = chats.find((chat) => chat.id == chatId);
      resolve(existingChat);
    });
  };
  return {
    find,
    create,
    findAllChatsForUser,
    findById
  }
};

export const ChatRepository = ChatRepositoryFunction();