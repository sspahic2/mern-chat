import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from 'react';

export const ProtectedRoute = ({ children }: { children: any }) => {
  const { user } = useContext(AuthContext);
  
  if (user.email == undefined) {
    return <Navigate to="/login" />;
  }
  return children;
};