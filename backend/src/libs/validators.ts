import validator from 'validator';

const validEmailProvided = (email: string) => {
  return validator.isEmail(email);
};

const validPasswordProvided = (password: string) => {
  return validator.isStrongPassword(password);
}

export { validEmailProvided, validPasswordProvided };