import React, {useState, useEffect, createContext} from 'react'

export const RoomSearchContext = createContext()

const RoomSearchProvider = ({children}) => {
  const [roomSearch, setRoomSearch] = useState("")
  const [roomListSearch, setRoomListSearch] = useState([])

  return (
    <RoomSearchContext.Provider value={{roomSearch, setRoomSearch, roomListSearch, setRoomListSearch}}>
      {children}
    </RoomSearchContext.Provider>
  )
}

export default RoomSearchProvider