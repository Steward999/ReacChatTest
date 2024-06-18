/* eslint-disable no-unused-vars */




import React, { createContext, useState, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { fetchConToken, fetchSinToken } from '../helpers/fetch';
import { ChatContext } from '../context/chat/ChatContext';
import { types } from '../types/types';


export const AuthContext = createContext();


const initialState = {

    uid:null,
    numerobots:null,
    checking:true,
    logged:false,
    name:null,
    email:null,

};



    
const AuthProvider = ({children}) => {
   
    const [auth, setAuth] = useState(initialState)
    const {dispatch} = useContext(ChatContext)    
    const login = async (email, password) => {

        const resp = await fetchSinToken('login', {email, password}, 'POST');
        
        if (resp.ok){
            localStorage.setItem('token', resp.token);
            const {usuario} = resp;

            setAuth({
                uid:usuario.uid,
                numerobots:"+573204171875",
                checking: false,
                logged: true,
                name:usuario.nombre,
                email: usuario.email
            });

        }

        return resp.ok;

    }

   
    const register = async (nombre, email, password) => {

        const resp = await fetchSinToken('login/new', {nombre,email, password}, 'POST');
        
        if (resp.ok){
            localStorage.setItem('token', resp.token);
            const {usuario} = resp;

            setAuth({
                uid:usuario.uid,
                numerobots:"+573204171875",
                checking: false,
                logged: true,
                name:usuario.nombre,
                email: usuario.email,
                
            });
            return true;

        }

        return resp.msg;

    }

    const verificarToken = useCallback(async() => {


        const token = localStorage.getItem('token');

        if (!token){

            setAuth({
                uid:null,
                numerobots:null,
                checking: false,
                logged: false,
                name: null,
                email: null
            });

            return false;
        }


        const resp = await fetchConToken('login/renew')
        if(resp.ok){
       


            localStorage.setItem('token', resp.token);
            const {usuario} = resp;

  

            setAuth({
                uid:usuario.uid,
                numerobots:"+573204171875",
                checking: false, 
                logged: true,
                name:usuario.nombre,
                email: usuario.email
            });
            return true;

        }else{
            setAuth({
                uid:null,
                numerobots:null,
                checking: false,
                logged: false,
                name: null,
                email: null
       
            });
            return  false;
        }


    }, [])

    const logout = () => {
        
        
        localStorage.removeItem('token');

        dispatch({ type: types.cerrarSesion})

        setAuth({
            checking: false,
            logged: false,
        });
    }  


    return (
        <AuthContext.Provider value={{
            auth,
            login,
            register,
            verificarToken,
            logout,
        }}>
        
        {children}
        
        </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider
