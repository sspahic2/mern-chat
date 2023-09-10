import { Flex, Stack } from "@chakra-ui/react";
import Chats from "../components/Chats";
import Messages from "../components/Messages";
import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import useChats from "../hooks/useChats";
import { SocketContext } from "../context/SocketContext";
import { ChatFull } from "../types/Chat";
import { ApiResponseChat } from "../types/ApiResponse";

const Chat = () => {

  const { user } = useContext(AuthContext);
  const { chatResponse, isLoading, updateCurrentChat, currentChat, chats, addChatToChats } = useChats(user);
  const { socket, setOnlineUsers, onlineUsers } = useContext(SocketContext);

  useEffect(() => {
    if(!socket || !user?.id || !chatResponse || chatResponse.data.length == 0) return;

    socket.emit("newUserJoined", { chatIds: chatResponse?.data.map((c: ChatFull) => c.id), user: user.id });

    socket?.on('onlineUsers', (ids: number[]) => {
      setOnlineUsers([...onlineUsers, ...ids]);
    });

    return () => {
      socket.off('onlineUsers');
    }
  }, [chatResponse]);

  useEffect(() => {
    socket?.on('getChats', (data: ApiResponseChat) => {
      if(data.data.members.includes(user.id))
        addChatToChats(data.data);
    });
  }, [socket])

  return (
    <>
      <Stack direction={{ 'base': 'column', 'lg': 'row' }} w={'100%'} h={{'base': 'auto', 'lg': '100%'}} paddingBottom={{'base': '1rem', 'lg': '10rem'}}>
        <Flex w={{'base': '100%', 'lg': '30%'}} h={'100%'} margin={'auto'}>
          <Chats 
            chatResponse={chatResponse} 
            isLoading={isLoading} 
            updateCurrentChat={updateCurrentChat} 
            chats={chats} 
            currentChat={currentChat} 
          />
        </Flex>
        <Flex w={{'base': '100%', 'lg': '70%'}} h={'100%'}>
          <Messages chat={currentChat} />
        </Flex>
      </Stack>
    </>
  )
};

export default Chat;