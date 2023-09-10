type UserModel = {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  salt: string;
};

type UserModelFull = Partial<UserModel>;

export { UserModelFull };

export default UserModel;