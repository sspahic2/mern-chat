import databaseContext from "../dbcontext/context";
import { convertToUserModel, convertToUserModelSafe, convertToUserModelSafeArray } from "../factories/userFactory";
import { encryptPassword } from "../libs/encryption";
import UserModel, { UserModelFull } from "../models/userModel";

// const users: UserModel[] = [
//   {
//     id: 1,
//     name: "Sabahudin Spahic",
//     email: 'test@test.com',
//     password: 'Chat123!',
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     salt: 'test'
//   }
// ]

// const findMax = () => {
//   let max = -1;
//   users.map((user) => {
//     if(user.id > max)
//       max = user.id;
//   });
//   return max;
// }

const UserRepositoryFunction = () => {
  const find = async(email: string): Promise<UserModel | undefined> => {
    const { data, error } = await databaseContext.from('user').select().eq('email', email).single();

    if(error) return undefined;
    return convertToUserModel(data!);
  };

  const create = async(newUser: UserModelFull): Promise<UserModel> => {
    const { salt, password } = await encryptPassword(newUser.password!);
    const { data, error } = await databaseContext.from('user').insert({
      email: newUser.email,
      name: newUser.name,
      password: password,
      salt: salt,
      updatedAt: new Date().toISOString()
    }).select().single();
    if(error) throw error;
    return convertToUserModel(data);
  };

  const findByName = async(name: string): Promise<UserModel[]> => {
    const { data, error } = await databaseContext.from('user').select().ilike('name', `%${name}%`);
    if(error) throw error;
    return convertToUserModelSafeArray(data);
  };

  const findByID = async(id: number): Promise<UserModel | undefined> => {
    const { data, error } = await databaseContext.from('user').select().eq('id', id).single();
    if(error) return undefined;
    return convertToUserModel(data);
  };

  const findAll = async(ids: number[]): Promise<UserModelFull[]> => {
    const { data, error } = await databaseContext.from('user').select().in('id', ids);
    if(error) throw error;
    return convertToUserModelSafeArray(data);
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