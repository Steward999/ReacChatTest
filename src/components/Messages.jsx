import React, { useContext, useState, useEffect } from 'react'
import SendMessage from './SendMessage'
import IncomingMessage from './IncomingMessage'
import OutgoingMessage from './OutgoingMessage'
import { ChatContext } from '../context/chat/ChatContext'
import { AuthContext } from '../auth/AuthContext'
import axios from 'axios' // Asumiendo que usas axios para las peticiones HTTP
import { fetchConToken, fetchSinToken } from '../helpers/fetch'


const Messages = () => {
  const { chatState } = useContext(ChatContext)
  const { auth } = useContext(AuthContext)
  const [isActive, setIsActive] = useState(false)

  const activePhoneNumber = chatState.chatActivo

  useEffect(() => {
    if (activePhoneNumber) {
      const fetchInitialState = async () => {
        try {
          const response = await axios.get(`https://backchatapi.azurewebsites.net/api/user/getButtonState/${activePhoneNumber}`);
          if (response.data.ok) {
            setIsActive(response.data.isActive);
          } else {
            console.error('Error en la respuesta del servidor:', response.data.message);
          }
        } catch (error) {
          console.error('Error fetching initial state:', error);
        }
      };
      fetchInitialState()
    }
  }, [activePhoneNumber])

  const toggleState = async () => {
    try {
      const response = await axios.post(`https://backchatapi.azurewebsites.net/api/user/toggleButtonState/${activePhoneNumber}`)
      // const response = await fetchSinToken(`user/toggleButtonState/${activePhoneNumber}`, null, 'POST')
      console.log(response);
      if (response.data.ok) {
        setIsActive(response.data.isActive)
      } else {
        console.error('Error en la respuesta del servidor:', response.data.msg)
      }
    } catch (error) {
      console.error('Error toggling state:', error)
    }
  }

  return (
    <div className="mesgs">
      <div className="button-container" style={{ textAlign: 'right', padding: '10px' }}>
        <button
          onClick={toggleState}
          style={{
            backgroundColor: isActive ? 'green' : 'gray',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {isActive ? 'Bot Activo' : 'Bot Inactivo'}
        </button>
      </div>

      <div id='mensajes' className="msg_history">
        {chatState.mensajes.map(msg => (
          msg.para === auth.numerobots
            ? <IncomingMessage key={msg._id} msg={msg}/>
            : <OutgoingMessage key={msg._id} msg={msg}/>
        ))}
      </div>

      <SendMessage/>
    </div>
  )
}

export default Messages