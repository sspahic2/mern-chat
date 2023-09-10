import { useEffect, useState } from "react";
import { UserFull } from "../types/User";
import { ChatFull } from "../types/Chat";
import { AuthService } from "../services/AuthService";

const userChatUser = (chat: ChatFull | undefined, user: UserFull) => {
  const [receivingUsers, setReceivingUsers] = useState<UserFull[]>([]);
  
  const receivingIds = chat?.members?.filter((id) => id != user.id!);

  useEffect(() => {
    const getUsers = async () => {

      if(receivingIds == undefined || receivingIds.length == null) return setReceivingUsers([]);

      let result = await AuthService.findUsers(receivingIds);

      setReceivingUsers(result.data);
    };
    if(chat && user)
      getUsers();
  }, [chat, user]);

  return { receivingUsers };
};

export default userChatUser