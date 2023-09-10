import { ChangeEvent, useState } from "react";
import { AuthService } from "../services/AuthService";
import ApiResponse, { ApiResponseChat } from "../types/ApiResponse";
import { UserFull } from "../types/User";
import { ChatService } from "../services/ChatService";

const useSearchUsers = (user: UserFull ) => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState<ApiResponse>();
  const [addedUsers, setAddedUsers] = useState<UserFull[]>([]);

  const updateSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  };

  const searchForUsers = async () => {
    if(searchText != '' && searchText.length > 2) {
      let result = await AuthService.searchForUsers(searchText);
      result.data = result.data.filter((u: UserFull) => u.id != user.id);
      setSearchResult(result);
    }
  };

  const resetSearchText = () => setSearchText('');

  const addUser = (usr: UserFull) => {
    if(!addedUsers.find(u => u.id == usr.id) && addedUsers.length < 5)
      setAddedUsers([...addedUsers, usr])
  };

  const removeUser = (usr: UserFull) => {
    setAddedUsers(addedUsers.filter((u) => u.id != usr.id));
  };

  const createChat = async(): Promise<ApiResponseChat> => {
    setSearchResult(undefined);
    setAddedUsers([]);
    setSearchText('');  
    return await ChatService.createChat([...addedUsers, user]);
  };

  return { 
    searchText, 
    updateSearchText, 
    searchResult, 
    searchForUsers, 
    resetSearchText, 
    addUser, 
    removeUser, 
    createChat,
    addedUsers
  };
};

export default useSearchUsers;