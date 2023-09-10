import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { MessageFull } from "../types/Message";
import { Card, CardBody, Flex, VStack } from "@chakra-ui/react";
import { converStringToDate, pretifyDate } from "../helpers/dateHelper";

const Message = ({ message }: {message: MessageFull }) => {
  const { user } = useContext(AuthContext);

  return (
    <Flex w={'100%'} justify={message.senderId == user.id ? 'end' : 'start'}>
      <Card maxW={'70%'} minW={'120px'} bg={message.senderId == user.id ? 'var(--chakra-colors-gray-600)' : 'var(--chakra-colors-gray-800)'}>
        <CardBody paddingInline={2} paddingBlock={2}>
          <VStack align={'center'}>
            <Flex w={'100%'} color={'#EAEEFF'}>{message.text}</Flex>
            <Flex 
              w={'100%'}
              color={'var(--text-color-red)'} 
              fontSize={'xs'} 
              justify={'end'}
            >
              {pretifyDate(converStringToDate(message.createdAt!))}
            </Flex>
          </VStack>
        </CardBody>
      </Card>
    </Flex>
  )
};

export default Message;