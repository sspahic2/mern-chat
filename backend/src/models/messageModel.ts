type MessageModel = {
  id: number;
  chatId: number;
  senderId: number;
  text: string;
  createdAt: Date;
};

type MessageModelFull = Partial<MessageModel>;

export { MessageModelFull };

export default MessageModel;