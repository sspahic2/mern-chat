import { useCallback, useEffect, useState } from "react";
import { ApiResponseChat } from "../types/ApiResponse";
import { ChatFull } from "../types/Chat";
import { UserFull } from "../types/User";
import { ChatService } from "../services/ChatService";

const useChats = (user: UserFull) => {
  const [chatResponse, setChatResponse] = useState<ApiResponseChat>();
  const [isLoading, setIsLoading] = useState(false);
  const [currentChat, setCurrentChat] = useState<ChatFull | undefined>();

  useEffect(() => {
    const getChatsForUser = async() => {
      setIsLoading(true);
      let response = await ChatService.getForUser(user);

      setIsLoading(false);
      setChatResponse(response);
    };

    getChatsForUser();
  }, [user]);

  const updateCurrentChat = useCallback((chat: ChatFull) => {
    setCurrentChat(chat);
  }, [user]);

  return { chatResponse, isLoading, updateCurrentChat, currentChat };
};

export default useChats;