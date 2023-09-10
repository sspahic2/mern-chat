import ApiResponse from "../types/ApiResponse";
import { UserFull } from "../types/User";
import { getRequest, postRequest } from "./HttpService"

const AuthServiceFunction = () => {
  const register = async(user: UserFull): Promise<ApiResponse> => {
    let body = {
      name: user.name,
      email: user.email,
      password: user.password
    };
    return await postRequest('/auth/register', body);
  };

  const login = async(user: UserFull): Promise<ApiResponse> => {
    let body = {
      email: user.email,
      password: user.password
    };

    return await postRequest('/auth/login', body);
  };

  const findUser = async(token: string): Promise<ApiResponse> => {
    return await getRequest(`/auth/find/${token}`);
  };

  const findUsers = async(ids: number[]): Promise<ApiResponse> => {
    return await getRequest('/user/find?ids=' + encodeURIComponent(JSON.stringify(ids)));
  };

  const searchForUsers = async(text: string): Promise<ApiResponse> => {
    return await getRequest(`/user/find/name/${text}`);
  }

  return {
    register,
    findUser,
    login,
    findUsers,
    searchForUsers
  };
};

export const AuthService = AuthServiceFunction();

