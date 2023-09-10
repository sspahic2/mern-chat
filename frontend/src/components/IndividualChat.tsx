import { Avatar, Flex, Text, VStack } from "@chakra-ui/react";
import { ChatFull } from "../types/Chat";
import userChatUser from "../hooks/useChatUser";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const IndividualChat = ({chat, onClick, currentChatId}: 
  { chat: ChatFull, 
    onClick: (chat: ChatFull) => void, 
    currentChatId: number 
  }) => {
    
  const { user } = useContext(AuthContext);
  const { receivingUsers } = userChatUser(chat, user);

  return (
    <>
      <Flex 
        cursor={'pointer'} 
        align={'center'} 
        margin={'auto'} 
        p={5}
        onClick={() => onClick(chat)}
        bg={chat.id != currentChatId ? 'var(--chakra-colors-blackAlpha-400)' : 'var(--chakra-colors-blackAlpha-700)'}
        borderRadius={'20px'}
      >
        <Flex mb={4}>
          <Avatar name={receivingUsers.map((u) => u.name).join(',')} />
          <VStack ml={3}>
          <Flex>
            <Text
              overflow={'hidden'}
              textOverflow={'ellipsis'}
              whiteSpace={'pre-wrap'}
              w={'200px'}
              h={'50px'}
            >
              {receivingUsers.map((u) => u.name).join(', ')}
            </Text>
          </Flex>
          {/* {
            lastMessage && 
            <Flex fontSize={'xs'} justify={'start'} w={'100%'}>
              { lastMessage?.senderId == user.id ? `You: ${lastMessage.text}` : lastMessage.text }
            </Flex>
          } */}
          </VStack>
        </Flex>
      </Flex>
    </>
  )
};

export default IndividualChat;