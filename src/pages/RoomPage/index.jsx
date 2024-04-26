import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAllGame } from 'src/api/game'
import RoomSearchCreate from './components/RoomSearchCreate'

const RoomPage = () => {
  const { roomId } = useParams()
  const [gameSelected, setGameSelected] = useState({})
  
  useEffect(() => {
    const fetchGameList = async () => {
      const data = await getAllGame()
      setGameSelected(data.find(item => item.id === roomId))
    }
    fetchGameList();
  })

  return (
    <div className='room-page-container'>
      <h1>{gameSelected.title}</h1>
      <RoomSearchCreate />
    </div>
  )
}

export default RoomPage