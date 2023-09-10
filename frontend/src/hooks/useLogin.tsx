import { ChangeEvent, useCallback, useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { UserFull } from "../types/User";
import { AuthService } from "../services/AuthService";
import ApiResponse from "../types/ApiResponse";

const useLogin = (initialState: UserFull) => {
  const { setUser } = useContext(AuthContext);
  const [loginValues, setLoginValues] = useState<UserFull>(initialState);
  const [loginResponse, setLoginResponse] = useState<ApiResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmitForm = useCallback(async(e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(async () => {
      let response = await AuthService.login(loginValues);

      if(response.success)
        setUser(response.data);
        
      setIsLoading(false);
      setLoginResponse(response);
    }, 3000);
  }, [loginValues]);

  const updateloginValues = useCallback((event: ChangeEvent<HTMLInputElement>) => {

    setLoginValues({ ...loginValues, [event?.currentTarget.name]: event.currentTarget.value });
  }, [initialState]);

  return { loginValues, updateloginValues, setLoginValues, handleSubmitForm, loginResponse, isLoading };
};

export default useLogin;