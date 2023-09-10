import express from 'express';
import { findUserByID, findUserByName, findUsers } from '../controllers/userController';

const userRouter = express.Router();

userRouter.get('/find/name/:name', findUserByName);
userRouter.get('/find/id/:id', findUserByID);
userRouter.get('/find?:ids', findUsers);

export default userRouter;