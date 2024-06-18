/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { ChatContext } from '../context/chat/ChatContext';
import { types } from '../types/types';
import {fetchConToken} from '../helpers/fetch';
import { scrollToBottom } from '../helpers/scrollTobottom';


const SidebarChatItem = ({ usuario}) => {

    const { chatState, dispatch} = useContext(ChatContext);
    const { chatActivo} = chatState
  
    // const onClick = async () => {
    //     dispatch({
    //         type: types.activarChat,
    //         payload: usuario.uid,
    //     })

     const onClick = async () => {
        dispatch({
            type: types.activarChat,
            payload: usuario.phoneNumber,
        })


        //CArgar los mensajes del chat

        // const resp = await fetchConToken(`mensajes/${usuario.uid}`)
        // dispatch({
        //     type: types.cargarMensajes,
        //     payload: resp.mensajes
        // })

        ///  Cambiar por el numero del bot
        const resp = await fetchConToken(`mensajes/${usuario.phoneNumber}/${'+573204171875'}`)
        // console.log(resp);
        dispatch({
            type: types.cargarMensajes,
            payload: resp.mensajes
        })

        //Mover el scroll
        scrollToBottom('mensajes');




    }
    
    // console.log(usuario);


  return (
   
        <div 
        // className={`chat_list ${(usuario.uid === chatActivo) && 'active_chat' }`}
        className={`chat_list ${(usuario.phoneNumber === chatActivo) && 'active_chat' }`}

        onClick={onClick}
        >
            {/* active_chat */}
        <div className="chat_people">
            <div className="chat_img"> 
                <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
            </div>
            {/* <div className="chat_ib">
                <h5>{usuario.nombre}</h5>
                {
                    (usuario.online)
                        ? <span className="text-success">Online</span>
                        : <span className="text-danger">Offline</span>
                }
                
                
            </div> */}

                        <div className="chat_ib">
                            <h5>{usuario.phoneNumber}</h5>
                            {/* {
                                (usuario.online)
                                    ? <span className="text-success">Online</span>
                                    : <span className="text-danger">Offline</span>
                            } */}
                            
                            
                        </div>
        </div>
    </div>

  )
}

export default SidebarChatItem
