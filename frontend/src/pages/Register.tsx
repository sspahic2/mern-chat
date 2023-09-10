import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Card, CardBody, CardHeader, Flex, FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import useRegister from "../hooks/useRegister";
import { Navigate } from "react-router-dom";

const Register = () => {
  const { 
    registerValues, 
    updateRegisterValues, 
    registerResponse, 
    handleSubmitForm,
    isLoading } = useRegister({ name: '', email: '', password: '' });

    if(registerResponse?.success) return <Navigate to={'/'} />;

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
          <Flex mb={registerResponse != undefined ? '20px' : ''} justify={'center'}>Registration form</Flex>
          {
            (registerResponse != undefined) && 
            <Flex>
              <Alert 
                status={registerResponse.success ? 'success' : 'error'} 
                borderRadius={'20px'}
                color={'ButtonText'}
              >
                <AlertIcon />
                <AlertTitle>{registerResponse.success ? 'Success' : 'Error'}</AlertTitle>
                <AlertDescription>{registerResponse?.message}</AlertDescription>
              </Alert>
            </Flex>
          }
        </CardHeader>
        <CardBody justifyContent={'center'} alignItems={'center'} margin={'auto'}>
          <form onSubmit={handleSubmitForm}>
            <FormControl isRequired mb={'2rem'}>
              <FormLabel>Name:</FormLabel>
              <Input type={'text'} name='name' value={registerValues.name} onChange={updateRegisterValues} />
            </FormControl>
            <FormControl isRequired gap={2} mb={'2rem'}>
              <FormLabel>Email:</FormLabel>
              <Input type={'email'} name='email' value={registerValues.email} onChange={updateRegisterValues} />
            </FormControl>
            <FormControl isRequired gap={2} mb={'2rem'}>
              <FormLabel>Password:</FormLabel>
              <Input backgroundImage={'red'} type={'password'} name='password' value={registerValues.password} onChange={updateRegisterValues} />
              <FormHelperText>Password must be at least 8 characters long, have one uppercase letter and one special character.</FormHelperText>
            </FormControl>
            <Flex justify={'center'}>
              <Button isLoading={isLoading} w={'80%'} type="submit" variant={'outline'} colorScheme="var(--text-color-red)">Register</Button>
            </Flex>
          </form>
        </CardBody>
      </Card>
    </>
  )
};

export default Register;