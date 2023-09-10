import express from 'express';
import { findUser, loginUser, registerUser } from '../controllers/authController'

const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.get('/find/:token', findUser)

export default authRouter;