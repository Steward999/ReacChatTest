import React, {useContext} from 'react'
import SidebarChatItem from '../components/SidebarChatItem';
import { ChatContext } from '../context/chat/ChatContext';
import { AuthContext } from '../auth/AuthContext';

const Sidebar = () => {

   const {chatState} = useContext(ChatContext);
    const {auth} = useContext(AuthContext);

    const {_id}= auth;



  return (

            <div className="inbox_chat">

                {
                    chatState.usuarios
                    
                    // .filter( user => user.uid !== uid)
                    .filter( user => user._id !== _id)

                    .map((usuario) =>(
                        <SidebarChatItem  
                            key={usuario._id}  
                            usuario={usuario}
                        />

                    ))
                    
                }

            {/* {chatState.usuarios.length > 0 && (
            chatState.usuarios
                .filter(user => user.uid !== uid)
                .map((usuario) => (
                <SidebarChatItem key={usuario.uid} usuario={usuario} />
                ))
            )}
            */}
            {/* <!-- Espacio extra para scroll --> */}
            <div className="extra_space"></div>
            </div>

  )
}

export default Sidebar
