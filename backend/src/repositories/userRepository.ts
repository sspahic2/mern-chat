import { encryptPassword } from "../libs/encryption";
import UserModel, { UserModelFull } from "../models/userModel";

const users: UserModel[] = [
  {
    id: 1,
    name: "Sabahudin Spahic",
    email: 'test@test.com',
    password: 'Chat123!',
    createdAt: new Date(),
    updatedAt: new Date(),
    salt: 'test'
  }
]

const findMax = () => {
  let max = -1;
  users.map((user) => {
    if(user.id > max)
      max = user.id;
  });
  return max;
}

const UserRepositoryFunction = () => {
  const find = async(email: string): Promise<UserModel | undefined> => {
    return await new Promise((resolve, reject) => {
      let user = users.find((user) => {
        if(user.email == email) return user;
      });
      resolve(user);
    });
  };

  const create = async(newUser: UserModelFull): Promise<UserModel> => {
    return await new Promise(async (resolve, reject) => {
      let { salt, password } = await encryptPassword(newUser.password!);
      let user: UserModel = {
        id: findMax() + 1,
        email: newUser.email!,
        name: newUser.name!,
        password: password,
        salt: salt,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      users.push(user);
      resolve(user);
    });
  };

  const findByName = async(name: string): Promise<UserModel[]> => {
    return await new Promise((resolve, reject) => {
      return resolve(users.filter((user) => {
        if(user.name.toLowerCase().includes(name.toLowerCase())) return user;
      }));
    });
  };

  const findByID = async(id: number): Promise<UserModel | undefined> => {
    return await new Promise((resolve, reject) => {
      let user = users.find((user) => user.id == id);
      resolve(user);
    });
  };

  const findAll = async(ids: number[]): Promise<UserModelFull[]> => {
    return await new Promise((resolve, reject) => {
      let existingUsers: UserModelFull[] = users.filter((user) => ids.includes(user.id));

      resolve(existingUsers);
    });
  }

  return {
    find,
    create,
    findByName,
    findByID,
    findAll
  }
};

export const UserRepository = UserRepositoryFunction();