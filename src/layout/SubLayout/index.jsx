import React, { useEffect } from 'react'
import { Container, Button } from 'react-bootstrap'
import backIcon from "assets/images/arrow-back.svg"
import subLayoutCircle from "assets/images/login-circle.svg"
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'
import { fetchAllGames } from 'src/store/game/actions'
import {gameSlice} from 'src/store/game/gameSlice'

const SubLayout = () => {
  const {roomId} = useParams()
  const dispatch = useDispatch()

  const gameList = useSelector(state => state.game.games)
  const gameSelected = gameList.find(game => game.id == roomId)
  const selectedGame = useSelector(state => state.game.selected)
  // const roomTitle = || "Room"

  useEffect(() => {
    if (gameList.length === 0) {
      dispatch(fetchAllGames())
    }
  }, [dispatch, gameList])

  useEffect(() => {
    dispatch(gameSlice.actions.selectGame(gameSelected))
  },[dispatch, gameSelected])


  return (
    <div className='sub-layout-container'>
      <Container className="sub-layout-header" fluid>
        <Button variant="dark" >
          <img src={backIcon} alt="back" />
        </Button>
        <h1>
          {selectedGame?.title || gameSelected?.title}
        </h1>
      </Container>
      <Outlet />
      <img src={subLayoutCircle} alt="circle" />
    </div>
  )
}

export default SubLayout