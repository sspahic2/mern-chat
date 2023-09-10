import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Card, CardBody, CardHeader, Flex, FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import useLogin from "../hooks/useLogin";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { 
    loginValues, 
    updateloginValues,
    handleSubmitForm, 
    loginResponse, 
    isLoading } = useLogin({
      email: '',
      password: ''
    });

  if(loginResponse?.success) return <Navigate to={'/'} />
  return (
    <>
      <Card
        justifyContent={'center'}
        alignItems={'center'}
        w={{'base': '320px', 'md': '600px'}}
        color={'var(--text-color-red)'}
        bg={'rgba(22,22,27,1)'}
        margin={'auto'}
        borderRadius={'20px'}
      >
        <CardHeader>
          <Flex mb={loginResponse != undefined ? '20px' : ''} justify={'center'}>Login form</Flex>
          {
            (loginResponse != undefined) && 
            <Flex>
              <Alert 
                status={loginResponse.success ? 'success' : 'error'} 
                borderRadius={'20px'}
                color={'ButtonText'}
              >
                <AlertIcon />
                <AlertTitle>{loginResponse.success ? 'Success' : 'Error'}</AlertTitle>
                <AlertDescription>{loginResponse?.message}</AlertDescription>
              </Alert>
            </Flex>
          }
        </CardHeader>
        <CardBody justifyContent={'center'} alignItems={'center'} margin={'auto'}>
          <form onSubmit={handleSubmitForm}>
            <FormControl isRequired mb={'2rem'}>
              <FormLabel>Email:</FormLabel>
              <Input type={'email'} name='email' value={loginValues.email} onChange={updateloginValues} />
            </FormControl>
            <FormControl isRequired mb={'2rem'}>
              <FormLabel>Password:</FormLabel>
              <Input backgroundImage={'red'} type={'password'} name='password' value={loginValues.password} onChange={updateloginValues} />
              <FormHelperText>Password must be at least 8 characters long, have one uppercase letter and one special character.</FormHelperText>
            </FormControl>
            <Flex justify={'center'}>
              <Button isLoading={isLoading} w={'80%'} type="submit" variant={'outline'} colorScheme="var(--text-color-red)">Login</Button>
            </Flex>
          </form>
        </CardBody>
      </Card>
    </>
  )
};

export default Login;