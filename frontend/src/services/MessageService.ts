import { MessageFull } from "../types/Message";
import { getRequest, postRequest } from "./HttpService";

const MessageServiceFunction = () => {
  const getMessagesFromChat = async (chatId: number) => {
    return await getRequest(`/message/find/${chatId}`);
  };

  const sendMessage = async(body: MessageFull) => {
    return await postRequest(`/message/create`, body);
  };

  return {
    getMessagesFromChat,
    sendMessage
  }
};

export const MessageService = MessageServiceFunction();