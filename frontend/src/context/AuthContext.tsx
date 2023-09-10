import { createContext, useEffect, useState } from "react";
import { UserFull } from "../types/User";
import { AuthService } from "../services/AuthService";
import { getCookie } from "../helpers/cookieHelper";
import { createEmptyUser } from "../factories/userFactory";

const initialValue = {
  user: createEmptyUser(),
  setUser: (u: UserFull) => {}
}

export const AuthContext = createContext<typeof initialValue>(initialValue);

export const AuthContextProvider = ({ children }: { children: JSX.Element[] | JSX.Element }) => {

  const [user, setUser] = useState<UserFull>(initialValue.user);

  useEffect(() => {
    const findUser = async() => {
      var b = getCookie('access_token')
      let { token }: { token: string } = b ? JSON.parse(decodeURIComponent(b!)) : { token: '' };

      if(token != '') {
        let response = await AuthService.findUser(token);
        setUser(response.data);
      }
    };
    if(!user.email)
      findUser();
  }, []);

  return <AuthContext.Provider value={{user, setUser}}>
    {children}
  </AuthContext.Provider>
};

export default AuthContext;