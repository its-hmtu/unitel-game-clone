import Header from "./components/Header"
import {Outlet} from 'react-router-dom'
import Footer from "./components/Footer"
import buonPiMay from 'images/buonpimay-event.png'
import { queryPoint, useMediaQuery } from "src/utils/hooks/useMediaQuery"

const MainLayout = () => {
  const isMobile = useMediaQuery(`(max-width: ${queryPoint.md}px)`)
  return (
    <div className="main-layout-container">
      <Header />
      <div className="main-layout-outlet">
        <div className="event-banner">
          <img src={buonPiMay} alt="" />
        </div>
        <Outlet />
      </div>
      {isMobile ? null : <Footer />}
    </div>
  )
}

export default MainLayout