import { ChatModelFull } from "../models/chatModel";

const ChatHelperFunction = () => {
  const checkIfAllProvidedIdsAreValid = (chat: ChatModelFull) => {

    if(!chat.members || chat.members?.length < 2)
      return {
        success: false,
        message: 'At least two ids need to be provided.'
      };

    let invalidIds = chat.members?.filter((member) => { return member <= 0 });

    if(invalidIds.length)
      return {
        success: false,
        message: 'Not all provided ids are valid.'
      };

      return {
        success: true,
        message: 'Provided ids are valid.'
      }
  };

  const checkIfValidIdWasProvided = (id: number) => {
    if(id <= 0)
      return {
        success: false,
        message: "Provided id isn't valid."
      };

    return {
      success: true,
      message: 'Provided id is valid.'
    };
  }
  return {
    checkIfAllProvidedIdsAreValid,
    checkIfValidIdWasProvided
  }
}

export const ChatHelper = ChatHelperFunction();