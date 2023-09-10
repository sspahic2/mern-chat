import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Chat from './pages/Chat'
import Register from './pages/Register'
import Login from './pages/Login'
import { Container } from '@chakra-ui/react'
import NavBar from './components/NavBar'
import { useContext } from 'react'
import AuthContext from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { SocketContextProvider } from './context/SocketContext'

function App() {
  const { user } = useContext(AuthContext);

  const checkIfUserAlreadyExists = (children: JSX.Element) => {
    if(user?.email)
      return <Navigate to={'/'} />;
    return children;
  }

  return (
    <>
      <SocketContextProvider user={user}>
        <NavBar />
        <Container maxW={'1440px'} height={'calc(90vh - 20px)'}>
          <Routes>
            <Route path='/' element={<ProtectedRoute><Chat /></ProtectedRoute>} />
            <Route path='/register' element={checkIfUserAlreadyExists(<Register />)} />
            <Route path='/login' element={checkIfUserAlreadyExists(<Login />)} />
            <Route path='*' element={ <Navigate to={'/'} /> } />
          </Routes>
        </Container>
      </SocketContextProvider>
    </>
  )
}

export default App
