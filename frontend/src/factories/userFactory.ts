import { UserFull } from "../types/User";

const createEmptyUser: () => UserFull = () => {
  return {
    id: undefined,
    name: undefined,
    email: undefined,
    password: undefined
  }
};

export { createEmptyUser }