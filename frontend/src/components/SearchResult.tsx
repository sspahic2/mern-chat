import { Text, VStack } from "@chakra-ui/react";
import { UserFull } from "../types/User";

const SearchResult = ({ user, onClick }: { user: UserFull, onClick: (user: UserFull) => void }) => {
  return (
    <>
      <VStack 
        bg={'#41414B'} 
        w={'60%'} 
        borderRadius={'5px'}
        h={'50px'}
        cursor={'pointer'}
        onClick={() => onClick(user)}
      >
        <Text 
          h={'100%'}
          align={'center'}
          textAlign={'center'}
          overflow={'hidden'}
          textOverflow={'ellipsis'}
          whiteSpace={'nowrap'}
          w={'100%'}
        >{user.name}</Text>
      </VStack>
    </>
  )
};

export default SearchResult;