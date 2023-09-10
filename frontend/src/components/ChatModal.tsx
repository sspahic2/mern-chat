import { Button, Flex, HStack, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack } from "@chakra-ui/react";
import SearchResults from "./SearchResults";
import useSearchUsers from "../hooks/useSearchUsers";
import { ChangeEvent, useContext, useMemo } from "react";
import debounce from "lodash/debounce";
import SelectedUsers from "./SelectedUsers";
import AuthContext from "../context/AuthContext";

const ChatModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const { user } = useContext(AuthContext);
  const { 
    searchText, 
    updateSearchText, 
    searchResult, 
    searchForUsers, 
    addUser, 
    removeUser,
    addedUsers,
    createChat } = useSearchUsers(user);

  const debouncedSendQuery = useMemo(debounce(searchForUsers, 500), [searchText]);
 
  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateSearchText(e);
    debouncedSendQuery;
  };

  const onCreate = async() => {
    await createChat();
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
      scrollBehavior="inside"
      closeOnOverlayClick
    >
      <ModalOverlay />
      <ModalContent
        bg={'rgba(22,23,31,1)'}
        w={{ 'base': '350px', 'md': '500px' }}
      >
        <ModalHeader>
          <VStack>
            <Flex>Create a chat</Flex>
            <Input 
              colorScheme="var(--text-color-red)" 
              type={'search'} 
              placeholder={'Search for friends'}
              value={searchText}
              onChange={onSearchChange}
              />
            {
              addedUsers.length >= 5 &&
                <Flex>A maximum of 5 users can be added.</Flex>
            }
          </VStack>
        </ModalHeader>
        <ModalBody maxH={'300px'} minH={'300px'} overflowY={'scroll'}>
          <VStack>
            <SelectedUsers users={addedUsers} removeUser={removeUser}/>
            <SearchResults usersResult={searchResult} addUser={addUser}/>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <HStack>
            <Button
              variant={'outline'} 
              colorScheme="var(--text-color-red)"
              _hover={{ background: 'var(--text-color-red)', color: 'rgba(22,23,31,1)', border: '2px solid rgba(22,23,31,1)' }}
              onClick={onCreate}
            >
              Create
            </Button>
            <Button 
              onClick={onClose}
              variant={'outline'} 
              colorScheme="var(--text-color-red)"
              _hover={{ background: 'var(--text-color-red)', color: 'rgba(22,23,31,1)', border: '2px solid rgba(22,23,31,1)' }}
              >Close</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
};

export default ChatModal;