import { Flex, HStack } from "@chakra-ui/react";
import { UserFull } from "../types/User";
import SelectedUser from "./SelectedUser";

const SelectedUsers = ({ users, removeUser }: { users: UserFull[], removeUser: (u: UserFull) => void }) => {

  return (
    <HStack
      overflowX={'auto'}
      gap={3}
      w={'100%'}
      h={'80px'}
    >
      {
        users.length == 0 &&
        <Flex>No users selected.</Flex>
      }
      {
        users.map((u) => {
          return <SelectedUser key={u.id} user={u} onClick={removeUser}/>
        })
      }
    </HStack>
  )
};

export default SelectedUsers;