import { ChangeEvent, useCallback, useContext, useState } from "react";
import { UserFull } from "../types/User";
import ApiResponse from "../types/ApiResponse";
import { AuthService } from "../services/AuthService";
import AuthContext from "../context/AuthContext";

const useRegister = (initialState: UserFull) => {
  const { setUser } = useContext(AuthContext);
  const [registerValues, setRegisterValues] = useState<UserFull>(initialState);
  const [registerResponse, setRegisterResponse] = useState<ApiResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmitForm = useCallback(async(e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(async () => {
      let response = await AuthService.register(registerValues);
      if(response.success)
        setUser(response.data);
      setIsLoading(false);
      setRegisterResponse(response);
    }, 3000);
  }, [registerValues]);

  const updateRegisterValues = useCallback((event: ChangeEvent<HTMLInputElement>) => {

    setRegisterValues({ ...registerValues, [event?.currentTarget.name]: event.currentTarget.value });
  }, [initialState]);

  return { registerValues, updateRegisterValues, setRegisterValues, handleSubmitForm, registerResponse, isLoading };
};

export default useRegister;

