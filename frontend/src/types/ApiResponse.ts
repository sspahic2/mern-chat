import { ChatFull } from "./Chat";
import { MessageFull } from "./Message";
import User from "./User";

type ApiResponse = {
  success: boolean;
  message: string;
  data: any;
  token: string;
};

type ApiResponseOverride<Key extends keyof ApiResponse> = Omit<ApiResponse, Key>;

type ApiResponseChat = ApiResponseOverride<'token'> & { data: ChatFull[] };

type ApiResponseMessage = ApiResponseOverride<'token'> & { data: MessageFull[] }

type ApiResponseUser = ApiResponseOverride<'token'> & ApiResponseOverride<'data'> & { data: User[] }

export type { ApiResponseChat, ApiResponseMessage, ApiResponseUser }

export default ApiResponse;