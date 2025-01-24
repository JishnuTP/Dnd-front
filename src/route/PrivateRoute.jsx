import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { mainContext } from '../context/mainContex'; // Adjust the path as necessary

const PrivateRoute = ({ children }) => {
  const { token } = useContext(mainContext);

  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
