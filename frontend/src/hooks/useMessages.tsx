import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { ChatFull } from "../types/Chat";
import { ApiResponseMessage } from "../types/ApiResponse";
import { MessageService } from "../services/MessageService";
import { UserFull } from "../types/User";
import { MessageFull } from "../types/Message";

const useMessages = (chat: ChatFull | undefined) => {
  const [messageResponse, setMessageResponse] = useState<ApiResponseMessage>({} as ApiResponseMessage);
  const [isLoading, setIsLoading] = useState(false);
  const [textMessage, setTextMessage] = useState<string>('');
  const [messages, setMessages] = useState<MessageFull[]>([]);

  useEffect(() => {
    const getMessages = async () => {
      setIsLoading(true);
      if(!chat == undefined || chat?.id == undefined) return;
      let response = await MessageService.getMessagesFromChat(chat?.id!);

      setIsLoading(false);
      setMessageResponse(response);
      setMessages(response.data);
    };

    getMessages()
  }, [chat]);

  const sendTextMessage = useCallback(async (user: UserFull) => {
    if(!textMessage || textMessage == '') return;
      await MessageService.sendMessage({
        senderId: user.id,
        chatId: chat?.id,
        text: textMessage
      });
      setTextMessage('');
  }, [textMessage]);

  const addMessageToMessages = (msg: MessageFull) => {
    setMessages((prev) => { return [ ...prev, { ...msg, createdAt: new Date().toString() } ] });
  }

  const updateTextMessage = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTextMessage(e.currentTarget.value);
  }, [textMessage]);

  return { messageResponse, isLoading, sendTextMessage, textMessage, updateTextMessage, addMessageToMessages, messages };
};

export default useMessages;