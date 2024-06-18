import React, { useContext } from "react";

import "../css/chat.css";
import InboxPeople from "../components/InboxPeople";
import Messages from "../components/Messages";

// import { AuthContext } from '../auth/AuthContext';

import ChatSelect from "../components/ChatSelect";
import { ChatContext } from "../context/chat/ChatContext";

const ChatPage = () => {
  // const {verificarToken} = useContext(AuthContext);

  const { chatState } = useContext(ChatContext);

  return (
    // <div className="contenedorPadre">

    <div className="messaging">
      <div className="inbox_msg">
        <InboxPeople />

      </div>
      <div className="messages_area">
        {chatState.chatActivo ? <Messages /> : <ChatSelect />}
      </div>
     
     </div>

    // </div>
  );
};    

export default ChatPage;
