

import { Navigate } from "react-router-dom";
import AuthRouter  from "./authRouter";
import PropTypes from 'prop-types'; 
 

 const PublicRoute = ({ isAuthenticated }) => {
  return !isAuthenticated ? <AuthRouter /> : <Navigate to="/" />;
};

PublicRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

export default PublicRoute 