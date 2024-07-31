import React, {useState, useEffect, createContext} from 'react'
import {socket, setSocketRoomId} from 'utils/socket' 

export const SocketContext = createContext();

const SocketProvider = ({children}) => {
  return (
    <SocketContext.Provider value={{socket, setSocketRoomId}}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider