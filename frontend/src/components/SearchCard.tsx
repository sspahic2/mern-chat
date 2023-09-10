import { Flex, VStack } from "@chakra-ui/react";
import { UserFull } from "../types/User";

const SearchCard = ({ user }: { user: UserFull }) => {
  return (
    <>
      <VStack 
        bg={'#41414B'} 
        w={'30%'} 
        borderRadius={'5px'}
      >
        <Flex>{user.name}</Flex>
      </VStack>
    </>
  )
};

export default SearchCard;