
import './App.css'
import * as React from "react";

import AppRoutes from './router/AppRouter';
import AuthProvider from './auth/AuthContext';
import SocketProvider from './context/SocketContext'
import ChatProvider from './context/chat/ChatContext';


import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

function App() {

  return (
      <ChatProvider>
    <AuthProvider>
        <SocketProvider>

          <AppRoutes />
        
        </SocketProvider>
    </AuthProvider>
      </ChatProvider>
   
  );
}

export default App


