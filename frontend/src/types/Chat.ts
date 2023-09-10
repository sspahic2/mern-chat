type Chat = {
  id: number;
  members: number[];
};

type ChatFull = Partial<Chat>

export type { ChatFull }

export default Chat;