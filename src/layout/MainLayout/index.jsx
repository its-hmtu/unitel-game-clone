import Header from "./components/Header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import buonPiMay from "images/buonpimay-event.png";
import { queryPoint, useMediaQuery } from "src/utils/hooks/useMediaQuery";
import FooterMobile from "./components/FooterMobile";
import { useContext, useEffect } from "react";
import { SocketContext } from "contexts/SocketContext";
import SnackBar from "components/SnackBar";
import { SnackBarContext } from "contexts/SnackBarContext";
import { PATHS } from "routes/path";
import { QueryClient, useQuery } from "react-query";
import { getCheckEventWaterQuery } from "data/game";
import { getUserQuery, userInfoKey } from "data/user";
import { destroyUserInfo } from "utils/localStorage";

const MainLayout = () => {
  const isMobile = useMediaQuery(`(max-width: ${queryPoint.md}px)`);
  const { socket, setSocketRoomId } = useContext(SocketContext);
  const { snackBar, setSnackBar } = useContext(SnackBarContext);
  const { data: eventWater, refetch: refetchEvent } = useQuery(
    getCheckEventWaterQuery()
  );
  const { data: user, isLoading: isUserLoading } = useQuery(getUserQuery());
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname.indexOf(
        PATHS.PLAYROOM_PAGE.replace(":roomId/:gameId", "")
      ) === -1
    ) {
      if (location.state && location.state.previous !== undefined) {
        if (
          location.state.previous.indexOf(
            PATHS.PLAYROOM_PAGE.replace(":roomId/:gameId", "")
          ) !== -1
        ) {
          const dataRoom = location.state.previous.split("/");
          socket.emit("leave-room", { room_id: dataRoom[dataRoom.length - 1] });
          window.history.replaceState({}, document.title);
        }
      } else setSocketRoomId(0);
      document.body.classList.remove("disable-scroll");
    }

  }, [location]);

  useEffect(() => {
    refetchEvent();
  }, [user]);

  const listPathRemoveIconEvent = [
    PATHS.EVENT_WATER_PAGE,
    PATHS.RESULT_EVENT_WATER_PAGE,
  ];

  const navigate = useNavigate()

  // useEffect(() => {
  //   if (isMobile) {
  //     // logout current user when user change from mobile to desktop
  //     destroyUserInfo();
  //     new QueryClient().invalidateQueries(userInfoKey);
  //     new QueryClient().removeQueries(userInfoKey);
  //   }
  // }, [isMobile])

  return (
    <div className="main-layout-container">
      <Header />
      <div className="main-layout-outlet">
        <div
          className={`event-banner ${
            !eventWater?.is_show ||
            (isMobile &&
              listPathRemoveIconEvent.indexOf(location.pathname) !== -1)
              ? "d-none"
              : ""
          }`}

          onClick={() => {
            if (!eventWater?.is_finished) {
              navigate(PATHS.EVENT_WATER_PAGE)
            } else {
              navigate(PATHS.RESULT_EVENT_WATER_PAGE)
            }
          }}
        >
          <img src={buonPiMay} alt="" />
        </div>
        <Outlet />
        <SnackBar
          runSnackBar={snackBar.open}
          message={snackBar.message}
          severity={snackBar.severity}
        />
      </div>
      {isMobile ? <FooterMobile /> : <Footer />}
    </div>
  );
};

export default MainLayout;
