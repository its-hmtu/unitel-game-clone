import { memo, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import RoomSearchCreate from './components/RoomSearchCreate'
import { Container, Row, Tab, Tabs } from 'react-bootstrap'
import { useMediaQuery, queryPoint } from 'hooks/useMediaQuery'
import RoomTableMobile from './components/RoomTableMobile'
import RoomTable from './components/RoomTable'
import { useQuery } from 'react-query'
import { getRoomLevelsQuery } from 'src/data/game'
import { useTranslation } from 'react-i18next'
import { getAllGameQuery } from 'data/game'

const RoomPage = () => {
  const { roomId } = useParams()
  const [level, setLevel] = useState("1")
  const {t} = useTranslation()
  
  // const [game, setGame] = useState({})
  const {data: gameList, isLoading: isAllGameLoading} = useQuery(getAllGameQuery())
  const gameSelected = gameList?.find((game) => game.id == roomId)
  const {data: roomLevels, isLoading} = useQuery(getRoomLevelsQuery())
  const isMobile = useMediaQuery(`(max-width: ${queryPoint.md}px)`)

  // const dispatch = useDispatch()

  // useEffect(() => {
  //   if (gameList?.length === 0) {
  //     dispatch(fetchAllGames())
  //   }
  // }, [dispatch, gameList])

  // useEffect(() => {
  //   if (roomLevels?.length === 0) {
  //     dispatch(fetchRoomLevels())
  //   }
  // }, [dispatch, roomLevels])

  // useEffect(() => {
  //   dispatch(gameSlice.actions.selectGame(gameList?.find(item => item.id == roomId)))
  // }, [dispatch, roomId, gameList]);

  useEffect(() => {
    console.log(gameSelected) 
  }, [])


  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    if (gameSelected) {
      document.title = gameSelected.name
      handleScrollTop()
    }

    return () => {
      document.title = "Unitel Games"
    }
  }, [gameSelected])
  
  return (
    <Container className='room-page-container' fluid>
      <Row className={`${isMobile ? 'room-page-container-mobile' : ""}`}>
        {/* {!isMobile &&  */<RoomSearchCreate />}
        <Tabs
          id="controlled-tab-example"
          activeKey={level}
          onSelect={(k) => setLevel(k)}
        >
          {
            Array.isArray(roomLevels) && 
            roomLevels?.map((item) => {
              return (
                <Tab eventKey={item.id} key={item.id} title={t(`room.tab.${item.name}`)}>
                  <div>
                    { 
                     isMobile 
                     ? (<RoomTableMobile />)
                     : (<RoomTable data={[{id: 1, player_count: "1", coin: "300", status: 2}]}/>) 
                    }
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