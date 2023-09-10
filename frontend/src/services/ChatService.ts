import { ApiResponseChat } from "../types/ApiResponse";
import { UserFull } from "../types/User";
import { getRequest, postRequest } from "./HttpService";

const ChatServiceFunction = () => {
  const getForUser = async(user: UserFull): Promise<ApiResponseChat> => {
    return await getRequest(`/chat/all/${user.id}`);
  };

  const createChat = async(users: UserFull[]): Promise<ApiResponseChat> => {
    return await postRequest(`/chat/create`, { members: users.map((u) => u.id) });
  };

  return {
    getForUser,
    createChat
  }
};

export const ChatService = ChatServiceFunction();