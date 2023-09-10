import ValidationResponse from "../DTO/validationResponse";
import { validEmailProvided, validPasswordProvided } from "../libs/validators";
import { UserModelFull } from "../models/userModel";

const UserHelperFunction = () => {
  const checkIfValidUserForRegistrationWasProvided = (user: UserModelFull): ValidationResponse => {
    if(!user.email || !user.name || !user.password) 
    return {
      success: false,
      message: 'All fields are required.'
    };

    if(!validEmailProvided(user.email!))
      return {
        success: false,
        message: 'Valid email needs to be provided.'
      };

    if(!validPasswordProvided(user.password!))
      return {
        success: false,
        message: 'Valid password needs to be provided.'
      };

    return {
      success: true,
      message: 'Validation successful.'
    }
  };

  const checkIfValidUserForLoginWasProvided = (user: UserModelFull): ValidationResponse => {
    if(!user.email|| !user.password) 
      return {
        success: false,
        message: 'Email and password are required.'
      };
    if(!validEmailProvided(user.email!))
      return {
        success: false,
        message: 'Valid email needs to be provided.'
      };

    return {
      success: true,
      message: 'Valid data was provided.'
    }
  };

  const checkIfValidNameWasProvided = (name: string): ValidationResponse => {
    if(name == '')
      return {
        success: false,
        message: 'Name needs to have at least one character.'
      };

    return {
      success: true,
      message: 'Valid name was provided.'
    };
  };

  const checkIfValidIDWasProvided = (id: number): ValidationResponse => {
    if(id <= 0)
      return {
        success: false,
        message: 'User ID must be greater than 0.'
      };
    
    return {
      success: true,
      message: 'Valid user ID was provided.'
    };
  };

  const checkIfAllIdsAreValid = (ids: number[]): ValidationResponse => {
    let result:ValidationResponse = {
      success: true,
      message: 'All provided ids are valid.'
    };

    ids.map((id) => {
      let validation = checkIfValidIDWasProvided(id);
      if(!validation.success) {
        result.success = false
        result.message = 'Invalid id was provided.';
        return;
      }
    });

    return result;
  }

  return {
    checkIfValidUserForRegistrationWasProvided,
    checkIfValidUserForLoginWasProvided,
    checkIfValidNameWasProvided,
    checkIfValidIDWasProvided,
    checkIfAllIdsAreValid
  }
};

export const UserHelper = UserHelperFunction();