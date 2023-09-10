import { Request, Response } from "express";
import { UserManager } from "../managers/userManager";
import { logError } from "../helpers/errorHelper";
import { ErrorFactory } from "../factories/errorFactory";

const findUserByName = async(req: Request, res: Response) => {
  try {
    return await UserManager.findUserByName(req, res);
  }catch(error) {
    logError('Error happened in UserController.FindUserByName', error);
    return res.status(500).json(ErrorFactory.create500Error(error));
  }
};

const findUserByID = async(req: Request, res: Response) => {
  try {
    return await UserManager.findUserByID(req, res);
  }catch(error) {
    logError('Error happened in UserController.FindUserByID', error);
    return res.status(500).json(ErrorFactory.create500Error(error));
  }
};

const findUsers = async(req: Request, res: Response) => {
  try {
    return await UserManager.findUsers(req, res);
  }catch(error) {
    logError('Error happened in UserController.FindUsers', error);
    return res.status(500).json(ErrorFactory.create500Error(error));
  }
}

export { findUserByName, findUserByID, findUsers };