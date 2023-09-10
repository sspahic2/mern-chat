import { Database } from "../models/supabase";
import UserModel from "../models/userModel";

const convertToUserModel = (user: Database['public']['Tables']['user']['Row']): UserModel => {
  return {
    id: user.id,
    email: user.email!,
    password: user.password!,
    salt: user.salt!,
    createdAt: new Date(user.createdAt),
    updatedAt: new Date(user.updatedAt ?? Date.now()),
    name: user.name!
  };
};

const convertToUserModelSafe = (user: Database['public']['Tables']['user']['Row']): UserModel => {
  return {
    id: user.id,
    email: user.email!,
    password: '',
    salt: '',
    createdAt: new Date(user.createdAt),
    updatedAt: new Date(user.updatedAt ?? Date.now()),
    name: user.name!
  };
}

const convertToUserModelArray = (users: Database['public']['Tables']['user']['Row'][]): UserModel[] => {
  const result: UserModel[] = [];
  users.forEach((ele) => result.push(convertToUserModel(ele)));
  return result;
};

const convertToUserModelSafeArray = (users: Database['public']['Tables']['user']['Row'][]): UserModel[] => {
  const result: UserModel[] = [];
  users.forEach((ele) => result.push(convertToUserModelSafe(ele)));
  return result
}

export { convertToUserModelArray, convertToUserModel, convertToUserModelSafe, convertToUserModelSafeArray };