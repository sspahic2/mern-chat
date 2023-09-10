import { Flex, VStack } from "@chakra-ui/react";
import { UserFull } from "../types/User";

const SearchResult = ({ user, onClick }: { user: UserFull, onClick: (user: UserFull) => void }) => {
  return (
    <>
      <VStack 
        bg={'#41414B'} 
        w={'30%'} 
        borderRadius={'5px'}
        h={'50px'}
        cursor={'pointer'}
        onClick={() => onClick(user)}
      >
        <Flex 
          h={'100%'}
          align={'center'}
          textAlign={'center'}
        >{user.name}</Flex>
      </VStack>
    </>
  )
};

export default SearchResult;