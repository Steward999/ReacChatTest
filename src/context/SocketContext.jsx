/* eslint-disable react/prop-types */
import React, {useContext, useEffect} from 'react';
import { createContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from './chat/ChatContext';
import { useSocket } from '../hooks/useSocket'

import { types } from '../types/types';
import { scrollToBottomAnimated } from '../helpers/scrollTobottom';

export const SocketContext = createContext();


 const SocketProvider = ({ children }) => {

    const { socket, online, conectarSocket, desconectarSocket } = useSocket('https://backchatapi.azurewebsites.net/');
    const {auth} = useContext(AuthContext);
    const { dispatch} = useContext(ChatContext);

    useEffect(() => {
   
        if (auth.logged) {
            conectarSocket();
        }   
      
    }, [auth, conectarSocket]);

    useEffect(() => {
   
        if (!auth.logged) {
            desconectarSocket();
        }   
      
    }, [auth, desconectarSocket]);

    useEffect(()=>{
        socket?.on('lista-usuarios', (usuarios)=>{
            // console.log(usuarios);
           dispatch({
            type: types.usuariosCargados,
            payload: usuarios
           });
        })
    },[socket, dispatch]);

    useEffect(()=>{
        socket?.on('mensaje-personal', (mensaje)=>{

            // console.log('mensaje en el effect', mensaje);
            
            dispatch({ 
                type: types.nuevoMensaje,
                payload:mensaje
            
            
            });


            scrollToBottomAnimated('mensajes');
            
        })
    },[socket, dispatch]);
    


    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}


export default SocketProvider