type ChatModel = {
  id: number;
  members: number[];
  createdAt: Date;
};

type ChatModelFull = Partial<ChatModel>;

export { ChatModelFull };

export default ChatModel;