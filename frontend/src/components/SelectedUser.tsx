import { Flex, HStack, IconButton } from "@chakra-ui/react";
import { UserFull } from "../types/User";
import { CloseIcon } from "@chakra-ui/icons";

const SelectedUser = ({ user, onClick }: { user: UserFull, onClick: (u: UserFull) => void }) => {
  return (
    <HStack 
      gap={4} 
      h={'40px'} 
      bg={'#41414B'} 
      borderRadius={'5px'} 
      p={5}
    >
      <Flex>{user.name}</Flex>
      <IconButton 
        size={'xs'} 
        icon={<CloseIcon />} 
        aria-label={"Remove user"} 
        variant={'ghost'}
        onClick={() => onClick(user)}
        colorScheme={'var(--text-color-red)'}
      />
    </HStack>
  )
};

export default SelectedUser;