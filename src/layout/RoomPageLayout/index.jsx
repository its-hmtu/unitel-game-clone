import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'
import OtherGames from 'src/pages/RoomPage/components/OtherGames'
import { fetchAllGames } from 'src/store/game/actions'
import { useMediaQuery, queryPoint } from 'src/utils/hooks/useMediaQuery'
import daovang from 'images/banne-daovang.png'


const RoomPageLayout = () => {
  const { roomId } = useParams()
  const isMobile = useMediaQuery(`(max-width: ${queryPoint.md}px)`)
  const dispatch = useDispatch()
  const gameList = useSelector((state) => state.game.games)
  const gameSelected = gameList.find((game) => game.id == roomId)
  const selectedGame = useSelector((state) => state.game.selected)
  let gameImage = gameSelected?.img || selectedGame?.img

  useEffect(() => {
    if (gameList.length === 0) {
      dispatch(fetchAllGames())
    }
  }, [dispatch, gameList])

  return (
    <div className='room-layout-container'>
      {isMobile ? null : <h1>{ gameSelected?.title }</h1>}
      {isMobile ? 
        (<img 
          src={gameImage}
          alt='room-image'
          className='room-image'
        />) : null
      }
      
      <Outlet />
      {isMobile ? null : <OtherGames gameList={gameList} roomId={roomId}/>}
      {/* <OtherGames gameList={gameList} roomId={roomId}/> */}
    </div>
  )
}

export default RoomPageLayout