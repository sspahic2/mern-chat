import { Flex, HStack } from "@chakra-ui/react";
import Chats from "../components/Chats";
import Messages from "../components/Messages";
import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import useChats from "../hooks/useChats";
import { SocketContext } from "../context/SocketContext";
import { ChatFull } from "../types/Chat";

const Chat = () => {

  const { user } = useContext(AuthContext);
  const { chatResponse, isLoading, updateCurrentChat, currentChat } = useChats(user);
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

  return (
    <>
      <HStack w={'100%'} h={'100%'} paddingBottom={'10rem'}>
        <Flex w={'30%'} h={'100%'}>
          <Chats chatResponse={chatResponse} isLoading={isLoading} updateCurrentChat={updateCurrentChat} />
        </Flex>
        <Flex w={'70%'} h={'100%'}>
          <Messages chat={currentChat} />
        </Flex>
      </HStack>
    </>
  )
};

export default Chat;