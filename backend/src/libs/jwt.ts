import UserModel from "../models/userModel";
import jwt, { VerifyErrors } from 'jsonwebtoken'

const secret = process.env.JWT_KEY || '123456789';

const createToken = (user: UserModel) => {
  return jwt.sign({ user: user.id, email: user.email }, secret, { expiresIn: '1d' });
}

const parseToken = (token: string) => {
  return jwt.verify(token, secret) as { user: number, email:string, iat: number, exp: number }; 
}

export { createToken, parseToken };