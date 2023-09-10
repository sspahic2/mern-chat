import { Card, CardBody, CardHeader, Flex, IconButton, VStack, useDisclosure } from "@chakra-ui/react";
import { ChatFull } from "../types/Chat";
import LoadingChats from "./LoadingChats";
import IndividualChat from "./IndividualChat";
import { ApiResponseChat } from "../types/ApiResponse";
import { AddIcon } from "@chakra-ui/icons";
import ChatModal from "./ChatModal";

const Chats = ({ chatResponse, isLoading, updateCurrentChat, chats, currentChat }: 
  { chatResponse: ApiResponseChat | undefined, 
    isLoading: boolean, 
    updateCurrentChat: (chat:ChatFull) => void, 
    chats: ChatFull[], 
    currentChat: ChatFull | undefined 
  }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Card
        w={{'base': '100px', 'md': '400px'}}
        color={'var(--text-color-red)'}
        bg={'rgba(22,23,31,1)'}
        h={'100%'}
      >
        <ChatModal isOpen={isOpen} onClose={onClose} />
        <CardHeader textAlign={'center'}>
          <VStack>
            <Flex>Chats</Flex>
            <Flex w={'100%'} justify={'end'}>
              Create chat room
              <IconButton 
                ml={'10px'} 
                size={'xs'} 
                icon={<AddIcon />} 
                aria-label={"Create chat"} 
                onClick={onOpen}/>
            </Flex>
          </VStack>
        </CardHeader>
        <CardBody overflowY={'scroll'}>
          {isLoading &&
            <LoadingChats />
          }
          <VStack gap={6}>
          {
            chatResponse?.success && chats.map((chat: ChatFull) => {
              return <IndividualChat key={chat.id} chat={chat} onClick={updateCurrentChat} currentChatId={currentChat?.id ?? -1}/>
            })
          }
          </VStack>
        </CardBody>
      </Card>
    </>
  )
};

export default Chats;