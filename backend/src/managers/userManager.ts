import { Request, Response } from "express";
import { UserModelFull } from "../models/userModel";
import { UserService } from "../services/userService";
import { createToken, parseToken } from "../libs/jwt";
import { logError } from "../helpers/errorHelper";
import { ErrorFactory } from "../factories/errorFactory";

const UserManagerFunction = () => {
  const registerUser = async(request: Request, response: Response) => {
    const user: UserModelFull = request.body;

    try {
      let res = await UserService.create(user);

      if(!res.success) 
        return response.status(400).json(res);

      let token = createToken(res.data);

      response.cookie("access_token", 
        JSON.stringify({ token: token })
      , {
        secure: process.env.NODE_ENV === "production",
        expires: new Date(new Date().setTime(new Date().getTime() +  (3 * 24 * 60 * 60 * 1000)))
      });

      return response.status(200).json({ ...res, token: token });
    }catch(error) {
      logError('Error happened in UserManager.RegisterUser', error);
      return response.status(500).json(ErrorFactory.create500Error(error));
    }
  };

  const loginUser = async(request: Request, response: Response) => {
    const user: UserModelFull = request.body;

    try {
      let res = await UserService.find(user);

      if(!res.success)
        return response.status(400).json(res);
      
      let token = createToken(res.data);

      response.cookie("access_token", 
        JSON.stringify({ token: token })
      , {
        secure: process.env.NODE_ENV === "production",
        expires: new Date(new Date().setTime(new Date().getTime() +  (3 * 24 * 60 * 60 * 1000)))
      });

      return response.status(200).json({ ...res, token: token });
    } catch(error) {
      logError('Error happened in UserManager.LoginUser', error);
      return response.status(500).json(ErrorFactory.create500Error(error));
    }
  };

  const findUserByName = async(request: Request, response: Response) => {
    const { name } = request.params;

    try {
      let res = await UserService.findByName(name);

      if(!res.success)
        return response.status(400).json(res);
      
      return response.status(200).json(res);

    }catch(error) {
      logError('Error happened in UserManager.FindUserByName', error);
      return response.status(500).json(ErrorFactory.create500Error(error));
    }
  };

  const findUserByID = async(request: Request, response: Response) => {
    const { id } = request.params;

    try {
      let res = await UserService.findByID(parseInt(id));

      if(!res.success)
        return response.status(400).json(res);
      
      return response.status(200).json(res);
    }catch(error) {
      logError('Error happened in UserManager.FindUserByID', error);
      return response.status(500).json(ErrorFactory.create500Error(error));
    }
  };

  const findUserByToken = async(request: Request, response: Response) => {
    const { token } = request.params;

    try {
      let { user, email }: { user: number, email: string } = parseToken(token);
      
      let res = await UserService.findByID(user);
      if(!res.success)
        return response.status(400).json(res);
    
      return response.status(200).json(res);
    }catch(error) {
      logError('Error happened in UserManager.FindUserByToken', error);
      return response.status(500).json(ErrorFactory.create500Error(error));
    }
  };

  const findUsers = async(request: Request, response: Response) => {
    const { ids } = request.query;
    const users: number[] = JSON.parse(decodeURIComponent(ids?.toString() ?? ""));

    try {
      let res = await UserService.findAll(users);

      return response.status(200).json(res);
    }catch(error) {
      logError('Error happened in UserManager.FindUsers', error);
      return response.status(500).json(ErrorFactory.create500Error(error));
    }
  }

  return {
    registerUser,
    loginUser,
    findUserByName,
    findUserByID,
    findUsers,
    findUserByToken
  };
};

export const UserManager = UserManagerFunction();