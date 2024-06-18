import React, { useContext, useState } from 'react'
import{SocketContext} from '../context/SocketContext'
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from '../context/chat/ChatContext';
const SendMessage = () => {


   const [mensaje, setmensaje] = useState('');
   const {socket} = useContext(SocketContext);
   const {auth} = useContext(AuthContext);
   const {chatState} = useContext(ChatContext)

   const onChange = ({target}) => {
        setmensaje(target.value);
   }

   const onSubmit = (ev) => {
        ev.preventDefault();

        if(mensaje.length === 0){return;}

        setmensaje('');

        // console.log('auth',auth);
        // console.log('chat state',chatState);

        socket.emit('mensaje-personal', {
            de:  auth.numerobots, //Cambiar al numero de bot por defecto
            para:  chatState.chatActivo, //esta bien toma el numero del chat activo
            mensaje
        })

        socket.emit('mensaje-bot', {
            de:  auth.numerobots, //Cambiar al numero de bot por defecto
            para:  chatState.chatActivo, //esta bien toma el numero del chat activo
            mensaje
        });


   }

  return (
    
        <form onSubmit={onSubmit}>

            
             
              <div className="type_msg row">
              <div className="input_msg_write col-sm-9">
                  <input 
                        type="text" 
                        className="write_msg" 
                        placeholder="Mensaje..." 
                        value={mensaje}
                        onChange={ onChange}
                  />
              </div>
              <div className="col-sm-3 text-center">
                  <button className="msg_send_btn mt-3" type="submit">
                      enviar
                  </button>
              </div>
          </div>
         
        </form>
  )
}

export default SendMessage
