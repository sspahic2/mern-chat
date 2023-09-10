import { Flex, VStack } from "@chakra-ui/react";
import { ApiResponseUser } from "../types/ApiResponse";
import User, { UserFull } from "../types/User";
import SearchResult from "./SearchResult";

const SearchResults = ({ usersResult, addUser }: { usersResult: ApiResponseUser | undefined, addUser: (user: UserFull) => void }) => {
  return (
    <VStack 
      gap={5} 
      w={'100%'} 
      h={'100%'}
    >
      {
        (!usersResult || !usersResult.success) &&
        <Flex>No results</Flex>
      }
      {
        usersResult?.success && usersResult?.data.map((user: User) => {
          return <SearchResult key={user.id} user={user} onClick={addUser} />
        })
      }
    </VStack>
  );
};

export default SearchResults;