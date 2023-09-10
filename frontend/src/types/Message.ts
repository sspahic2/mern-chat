type Message = {
  id: number;
  chatId: number;
  senderId: number;
  text: string;
  createdAt: string;
};

type MessageFull = Partial<Message>

export type { MessageFull };

export default Message;