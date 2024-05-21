import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import RoomSearchCreate from './components/RoomSearchCreate'
import { Container, Row, Tab, Tabs } from 'react-bootstrap'
import Table from 'src/components/Table'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllGames, fetchRoomLevels } from 'src/store/game/actions'
import { gameSlice } from "src/store/game/gameSlice";
import { useMediaQuery, queryPoint } from 'src/utils/hooks'

const RoomPage = () => {
  const { roomId } = useParams()
  const [level, setLevel] = useState("1")
  
  // const [game, setGame] = useState({})
  const gameSelected = useSelector(state => state.game.selected)
  const gameList = useSelector(state => state.game.games || [])
  const roomLevels = useSelector(state => state.game.roomLevels)
  const isMobile = useMediaQuery(`(max-width: ${queryPoint.md}px)`)

  const dispatch = useDispatch()

  useEffect(() => {
    if (gameList.length === 0) {
      dispatch(fetchAllGames())
    }
  }, [dispatch, gameList])

  useEffect(() => {
    if (roomLevels.length === 0) {
      dispatch(fetchRoomLevels())
    }
  }, [dispatch, roomLevels])

  useEffect(() => {
    dispatch(gameSlice.actions.selectGame(gameList.find(item => item.id == roomId)))
  }, [dispatch, roomId, gameList]);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    if (gameSelected) {
      document.title = gameSelected.title
      handleScrollTop()
    }

    return () => {
      document.title = "Unitel Games"
    }
  }, [gameSelected])
  
  return (
    <Container className='room-page-container' fluid>
      <Row className={`${isMobile ? 'room-page-container-mobile' : ""}`}>
        {!isMobile && <RoomSearchCreate />}
        <Tabs
          id="controlled-tab-example"
          activeKey={level}
          onSelect={(k) => setLevel(k)}
        >
          {
            Array.isArray(roomLevels) && 
            roomLevels.map((item) => {
              return (
                <Tab eventKey={item.id} key={item.id} title={item.name}>
                  <div>
                    <Table roomTable data={[{id: 1, playerName: "name", betLevel: "300", status: ""}]}/>
                  </div>
                </Tab>
              )
            })
          }
        </Tabs>
      </Row>
    </Container>
  )
}

export default RoomPage