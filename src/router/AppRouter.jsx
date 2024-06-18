import React,{useContext, useEffect,} from 'react'

import { BrowserRouter,  Routes ,Route, } from 'react-router-dom';



import { AuthContext } from '../auth/AuthContext';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';





function AppRoutes() {

  const {auth, verificarToken} = useContext(AuthContext);


  useEffect(() => {
   verificarToken();
  },[verificarToken])


  if(auth.checking){
    return <h1>Espere por Favor</h1>
  }


  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth/*"
          element={<PublicRoute isAuthenticated={auth.logged} />}
        />
        <Route
          path="/"
          element={<PrivateRoute isAuthenticated={auth.logged} />}
        />
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes

