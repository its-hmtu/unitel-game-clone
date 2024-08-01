import React, { useContext, useEffect } from 'react'
import { Container, Button } from 'react-bootstrap'
import backIcon from "assets/images/arrow-back.svg"
import subLayoutCircle from "assets/images/login-circle.svg"
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getAllGameQuery } from 'src/data/game'
import { queryPoint, useMediaQuery } from 'utils/hooks/useMediaQuery'
import { PATHS } from 'routes/path'
import { TitleContext } from 'contexts/TitleContext'

const SubLayout = () => {
  const location = useLocation()
  const navigate = useNavigate();
  const {roomId} = useParams()
  const {data: games, isLoading} = useQuery(getAllGameQuery()) 
  const gameSelected = games?.find(game => game.id == roomId)
  const roomTitle = gameSelected?.name || "Room"
  const {title} = useContext(TitleContext)
  const isMobileMD = useMediaQuery(`(max-width: ${queryPoint.md}px)`)

  const handleBack = () => {
    if (location.pathname.includes("/room") && isMobileMD) {
      navigate(PATHS.HOME_PAGE)
    } else {
      navigate(-1)
    }
  }

  return (
    <div className='sub-layout-container'>
      <Container className="sub-layout-header" fluid>
        <Button variant="dark" onClick={handleBack}>
          <img src={backIcon} alt="back" />
        </Button>
        <h1>
          {
            window.location.pathname.split('/')[1] === PATHS.ROOM_PAGE.split('/')[1] && window.location.pathname.split('/')[3] == null ? roomTitle : title
          }
        </h1>
      </Container>
      <Outlet />
      <img src={subLayoutCircle} alt="circle" />
    </div>
  )
}

export default SubLayout