type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

type UserFull = Partial<User>;

export type { UserFull };

export default User;