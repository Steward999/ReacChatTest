import React, { createContext, useReducer } from "react";
import PropTypes from 'prop-types';
import { chatReducer } from "./chatReducer";



export const ChatContext = createContext();

const initialState = {
    uid: '',
    chatActivo: null, //UID (numero) del ususario al que yo quiero enviar mensajes
    usuarios: [], // Todos los usuarios de la BD
    mensajes: [], // El chat seleccionado
};



const ChatProvider = ({children}) => {


    const [chatState, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={{
        chatState,
        dispatch
    }}>
      {children}
    </ChatContext.Provider>
  )
}

ChatProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ChatProvider
