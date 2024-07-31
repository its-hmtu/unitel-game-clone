import { memo, useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import RoomSearchCreate from './components/RoomSearchCreate'
import { Container, Row, Tab, Tabs } from 'react-bootstrap'
import { useMediaQuery, queryPoint } from 'hooks/useMediaQuery'
import RoomTableMobile from './components/RoomTableMobile'
import RoomTable from './components/RoomTable'
import { useQuery } from 'react-query'
import { getRoomLevelsQuery } from 'src/data/game'
import { useTranslation } from 'react-i18next'
import { getAllGameQuery, getListRoomOfGameQuery } from 'data/game'
import CreateRoomModal from 'components/Modal/CreateRoomModal'
import { SocketContext } from 'utils/socket'

const RoomPage = () => {
  const location = useLocation()
  const { pathname } = useLocation()
  const { roomId } = useParams()
  const [level, setLevel] = useState("1")
  const {t} = useTranslation()
  const {socket, setSocketRoomId} = useContext(SocketContext)

  useEffect(() => {
    setSocketRoomId(0)
  }, [location])

  
  // const [game, setGame] = useState({})
  const {data: gameList, isLoading: isAllGameLoading} = useQuery(getAllGameQuery())
  const gameSelected = gameList?.find((game) => game.id == roomId)
  const {data: roomLevels, isLoading} = useQuery(getRoomLevelsQuery())
  const isMobile = useMediaQuery(`(max-width: ${queryPoint.md}px)`)
  

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
    handleScrollTop()
  }, [pathname])

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
    <>
      <Container className='room-page-container' fluid>
        <Row className={`${isMobile ? 'room-page-container-mobile' : ""}`}>
          {/* {!isMobile &&  */<RoomSearchCreate game={gameSelected} level={level}/>}
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
                       : (<RoomTable game={gameSelected} level={level}/>)
                      }
                    </div>
                  </Tab>
                )
              })
            }
          </Tabs>
        </Row>
      </Container>

    </>
  )
}

export default RoomPage