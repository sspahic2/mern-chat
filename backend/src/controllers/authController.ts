import { Request, Response } from "express";
import { UserManager } from "../managers/userManager";
import { logError } from "../helpers/errorHelper";
import { ErrorFactory } from "../factories/errorFactory";

const registerUser = async(req: Request, res: Response) => {
  try {
    return UserManager.registerUser(req, res);
  }catch(error) {
    logError('Error happened in AuthController.RegisterUser.', error);
    return res.status(500).json(ErrorFactory.create500Error(error));
  };
};

const loginUser = async(req: Request, res: Response) => {
  try {
    return UserManager.loginUser(req, res);
  }catch(error) {
    logError('Error happened in AuthController.LoginUser', error);
    return res.status(500).json(ErrorFactory.create500Error(error));
  };
};

const findUser = async(req: Request, res: Response) => {
  try {
    return UserManager.findUserByToken(req, res);
  }catch(error) {
    logError('Error happened in AuthController.LoginUser', error);
    return res.status(500).json(ErrorFactory.create500Error(error));
  };
}

export { registerUser, loginUser, findUser };