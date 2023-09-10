import bcrypt from 'bcrypt';

const encryptPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(5);
  return { salt, password: await bcrypt.hash(password, salt) };
};

const encryptPasswordWithExistingSalt = async(salt:string, password: string) => {
  return await bcrypt.hash(password, salt);
};

export { encryptPassword, encryptPasswordWithExistingSalt }