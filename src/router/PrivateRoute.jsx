import React from 'react';
import PropTypes from 'prop-types'; 
import {Navigate } from 'react-router-dom';


import  ChatPage  from "../pages/ChatPage";
 const PrivateRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? <ChatPage /> : <Navigate to="/auth/login" />;
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};


export default PrivateRoute 

