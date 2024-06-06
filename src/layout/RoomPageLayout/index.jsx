import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'
import OtherGames from 'src/pages/RoomPage/components/OtherGames'
import { fetchAllGames } from 'src/store/game/actions'
import { useMediaQuery, queryPoint } from 'src/utils/hooks/useMediaQuery'
import { useQuery } from 'react-query'
import { getAllGameQuery } from 'src/data/game'


const RoomPageLayout = () => {
  const { roomId } = useParams()
  const {data: games, isLoading} = useQuery(getAllGameQuery())
  const isMobile = useMediaQuery(`(max-width: ${queryPoint.md}px)`)
  // const dispatch = useDispatch()
  // const gameList = useSelector((state) => state.game.games)
  const gameSelected = games?.find((game) => game.id == roomId)
  // const selectedGame = useSelector((state) => state.game.selected)
  let gameImage = gameSelected?.img
  const [gameList, setGameList] = useState([])

  // useEffect(() => {
  //   if (gameList.length === 0) {
  //     dispatch(fetchAllGames())
  //   }
  // }, [dispatch, gameList])

  useEffect(() => {
    if (games) {
      setGameList(games)
    } else {
      setGameList([])
    }
  }, [games])

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