import { APIResponse } from "../DTO/apiResponse";
import ServiceResponse from "../DTO/serviceResponse";
import { ErrorFactory } from "../factories/errorFactory";
import { logError } from "../helpers/errorHelper";
import { UserHelper } from "../helpers/userHelper";
import { encryptPasswordWithExistingSalt } from "../libs/encryption";
import { UserModelFull } from "../models/userModel";
import { UserRepository } from "../repositories/userRepository";

const UserServiceFunction = () => {
  const create = async(newUser: UserModelFull): Promise<ServiceResponse> => {
    const validationResult = UserHelper.checkIfValidUserForRegistrationWasProvided(newUser);

    if(!validationResult.success)
      return {
        success: validationResult.success,
        message: validationResult.message,
        data: newUser
      };

    try {
      let user = await UserRepository.find(newUser.email!);
      if(user) 
        return {
          success: false,
          message: 'User already exists.',
          data: user
        };

      let createdUser = await UserRepository.create(newUser);

      return {
        success: true,
        message: 'User successfully created.',
        data: createdUser
      };
    }catch(error) {
      logError('Error while creating user.', error);
      return ErrorFactory.createServiceError('Error while creating user.');
    }
  };

  const find = async(user: UserModelFull): Promise<ServiceResponse> => {
    const validationResult = UserHelper.checkIfValidUserForLoginWasProvided(user);

    if(!validationResult.success)
      return {
        success: validationResult.success,
        message: validationResult.message,
        data: user
      };

    try {
      let existingUser = await UserRepository.find(user.email!);

      if(!existingUser || await encryptPasswordWithExistingSalt(existingUser.salt, user.password!) != existingUser.password)
        return {
          success: false,
          message: 'Invalid email or password were provided.',
          data: user
        };

      return {
        success: true,
        message: 'User was found.',
        data: existingUser
      };
    }catch(error) {
      logError('Error while validating user.', error);
      return ErrorFactory.createServiceError('Error while validating user.');
    }
  };

  const findAll = async(users: number[]): Promise<ServiceResponse> => {
    const validationResult = UserHelper.checkIfAllIdsAreValid(users);

    if(!validationResult.success) return { ...validationResult, data: users };

    try {
      let existingUsers = await UserRepository.findAll(users);

      if(existingUsers.length != users.length) 
        return {
          success: false,
          message: 'Not all provided ids exist.',
          data: users
      };

      return {
        success: true,
        message: 'All provided ids exist.',
        data: existingUsers
      };
    }catch(error) {
      logError('Error happened while finding all users.', error);
      return ErrorFactory.createServiceError('Error happened while finding all users.');
    }
  };

  const findByName = async(name: string): Promise<ServiceResponse> => {
    let validationResult = UserHelper.checkIfValidNameWasProvided(name);

    if(!validationResult.success) 
      return {
        success: validationResult.success,
        message: validationResult.message,
        data: name
      };

    try {
      let users = await UserRepository.findByName(name);

      return {
        success: true,
        message: 'Successfully queried database for users.',
        data: users
      };
    }catch(error) {
      logError('Error while searching for user.', error);
      return ErrorFactory.createServiceError('Error while searching for user.');
    };
  };

  const findByID = async(id: number): Promise<ServiceResponse> => {
    let validationResult = UserHelper.checkIfValidIDWasProvided(id);
    if(!validationResult.success)
      return {
        success: validationResult.success,
        message: validationResult.message,
        data: id
      };

    try {
      let user = await UserRepository.findByID(id);
      
      if(!user)
        return {
          success: false,
          message: 'User with given ID does not exist.',
          data: id
        };

      return {
        success: true,
        message: 'User successfully found.',
        data: user
      };
    }catch(error) {
      logError('Error while searching for user.', error);
      return ErrorFactory.createServiceError('Error while searching for user.');
    }
  }

  return {
    create,
    find,
    findByName,
    findByID,
    findAll
  }
};

export const UserService = UserServiceFunction();