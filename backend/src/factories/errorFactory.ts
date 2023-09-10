const ErrorFactoryFunction = () => {
  const create500Error = (error: unknown) => {
    return {
      success: false,
      message: 'Error',
      data: error
    };
  };

  const createServiceError = (message: string) => {
    return {
      success: false,
      message,
      data: undefined
    };
  };

  return {
    create500Error,
    createServiceError
  }
};

export const ErrorFactory = ErrorFactoryFunction();