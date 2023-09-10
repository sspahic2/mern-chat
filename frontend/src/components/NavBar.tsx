import { Container, Flex, HStack, Link } from "@chakra-ui/react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { deleteCookie } from "../helpers/cookieHelper";
import { SocketContext } from "../context/SocketContext";

const NavBar = () => {
  const { user, setUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);

  const logout = () => {
    deleteCookie('access_token');
    setUser({});
    socket?.off('disconnect');
  }

  const routes: {
    to: string, text: string, condition: boolean, click: () => void
  }[] = [
    {
      to: '/login',
      text: 'Login',
      condition: user?.email == undefined,
      click: () => {}
    },
    {
      to: '/register',
      text: 'Register',
      condition: user?.email == undefined,
      click: () => {}
    },
    {
      to: '/login',
      text: 'Logout',
      condition: user?.email != undefined,
      click: logout
    }
  ];

  return(
    <Flex
      h={'10vh'}
      w={'100vw'}
      mb={'20px'}
    >
      <Container 
        maxW={'1440px'} 
        m={'auto'}
      >
        <HStack justify={'end'}>
          <Flex>{user.name} / {user.id}</Flex>
          {
            routes.map((route) => {
              if(route.condition)
                return (
                <Flex
                  border={'1px solid var(--text-color-red)'}
                  borderRadius={'5px'}
                  h={'50px'}
                  w={'100px'}
                  justify={'center'}
                  align={'center'}
                  _hover={{ background: 'var(--text-color-red)', color: 'rgba(22,23,31,1)', border: '2px solid rgba(22,23,31,1)' }}
                  fontWeight={'bold'}
                  key={route.text}
                >
                  <Link  
                    href={route.to} 
                    onClick={route.click}
                    textDecoration={'none'}
                  >
                    {route.text}
                  </Link>
                </Flex>
                )
            })
          }
        </HStack>
      </Container>
    </Flex>
  )
};

export default NavBar;