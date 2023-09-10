import { Avatar, AvatarBadge, Card, CardBody, CardHeader, Flex, HStack, IconButton, Input } from "@chakra-ui/react";
import { ChatFull } from "../types/Chat";
import useMessages from "../hooks/useMessages";
import { MessageFull } from "../types/Message";
import Message from "./Message";
import { ChatIcon } from "@chakra-ui/icons";
import { KeyboardEvent, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import LoadingMessages from "./LoadingMessages";
import userChatUser from "../hooks/useChatUser";
import { SocketContext } from "../context/SocketContext";
import useScroll from "../hooks/useScroll";

const Messages = ({ chat }: { chat: ChatFull | undefined }) => {

  const { messageResponse, textMessage, sendTextMessage, updateTextMessage, isLoading, addMessageToMessages, messages } = useMessages(chat);
  const { user } = useContext(AuthContext);
  const { receivingUsers } = userChatUser(chat!, user);
  const { onlineUsers, socket } = useContext(SocketContext);
  const ref = useScroll(messages);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key == 'Enter')
      sendMessage();
  };

  const sendMessage = () => {
    sendTextMessage(user);
    socket?.emit('sendMessage', { senderId: user.id, text: textMessage, chatId: chat?.id });
  }

  useEffect(() => {
    socket?.on('getMessage', (msg: MessageFull) => {
      if(chat == undefined || msg.chatId != chat.id) return;
      addMessageToMessages(msg);
    });

    return () => {
      socket?.off('getMessage');
    }
  }, [socket, chat]);

  return (
    <>
      <Card
        w={'100%'}
        bg={'var(--chakra-colors-gray-900)'}
        p={'5rem'}
        h={'100%'}
      >
        {
          (!chat) &&
          <Flex 
            color={'var(--text-color-red)'} 
            justify={'center'}
          >
            No chat selected
          </Flex>
        }
        {chat != undefined && 
          <>
            <CardHeader>
              <HStack 
                w={'100%'} 
                justify={'center'} 
                gap={4}
              >
                { receivingUsers.map((u) => {
                  return (
                    <Avatar key={u.id} name={u.name}>
                      <AvatarBadge 
                        boxSize={'1em'} 
                        bg={onlineUsers.some((t) => t == u.id) ?  'green.500' : 'var(--text-color-red)'} 
                      />
                    </Avatar>
                  )
                })
                }
              </HStack>
            </CardHeader>
            <CardBody overflow={'hidden'}>
              <Flex 
                w={'100%'} 
                h={'85%'} 
                direction={'column'} 
                gap={2} 
                overflowY={'auto'} 
                paddingInline={2} 
                ref={ref}
              >
                { isLoading &&
                  <LoadingMessages />
                }
                {
                  messageResponse?.success && messages.map((message: MessageFull) => {
                    return <Message key={message.createdAt} message={message}/>
                  })
                }
                {
                  messageResponse?.success && messages.length == 0 && 
                    <Flex 
                      color={'var(--text-color-red)'} 
                      justify={'center'}
                    >
                      Send a message. Get to know eachother!
                    </Flex>
                }
              </Flex>
              <HStack h={'15%'}>
                <Flex w={'100%'}>
                  <Input 
                    type={'text'} 
                    onChange={updateTextMessage} 
                    value={textMessage} 
                    bg={'var(--chakra-colors-gray-600)'}
                    color={'var(--chakra-colors-gray-100)'}
                    borderRadius={'30px'}
                    onKeyDown={handleKeyDown}
                    />
                </Flex>
                <IconButton 
                  isRound 
                  variant={'outline'} 
                  fontSize={'16px'} 
                  icon={<ChatIcon color={'var(--chakra-colors-gray-100)'} />}
                  aria-label={'Send message'}
                  onClick={sendMessage}
                  color={'var(--chakra-colors-gray-100)'}
                  _hover={{ 'bg': 'var(--chakra-colors-gray-700)', 'color': 'var(--chakra-colors-gray-100)' }}
                />
              </HStack>
            </CardBody>
          </>
        }
      </Card>
    </>
  )
};

export default Messages;