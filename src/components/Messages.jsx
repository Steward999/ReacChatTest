import React, { useContext } from 'react'
import SendMessage from './SendMessage'
import IncomingMessage from './IncomingMessage'
import OutgoingMessage from './OutgoingMessage'
import { ChatContext } from '../context/chat/ChatContext'
import { AuthContext } from '../auth/AuthContext'

const Messages = () => {


  const {chatState} = useContext(ChatContext)
  const {auth} = useContext(AuthContext)


  // console.log('llego aca', auth)
  console.log('Chatstate', chatState.mensajes);

  return (
            <div className="mesgs">

            {/* <!-- Historia inicio --> */}
            <div 
                id='mensajes'
                className="msg_history">


            {
              chatState.mensajes.map(msg => (
              
              (msg.para === auth.numerobots) //compara el para con el uid pero debo caompararlo con el numero para mostrartlo
                // ? <IncomingMessage key={msg._id} msg={msg}/>
                ? <IncomingMessage key={msg._id} msg={msg}/>

                // : <OutgoingMessage key={msg._id} msg={msg}/>
                : <OutgoingMessage key={msg._id} msg={msg}/>


            ))
            }

            </div>
            {/* <!-- Historia Fin --> */}

                <SendMessage/>

        </div>

  )
}

export default Messages
