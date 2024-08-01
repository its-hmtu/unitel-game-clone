import { Routes, Route } from "react-router-dom";
import MainLayout from "src/layout/MainLayout";
import RoomPageLayout from "layout/RoomPageLayout";
import SubLayout from "src/layout/SubLayout";
import HomePage from "src/pages/HomePage";
import PrizePage from "src/pages/PrizePage";
import ProfilePage from "src/pages/ProfilePage";
import RankPage from "src/pages/RankPage";
import RoomPage from "src/pages/RoomPage";
import SettingPage from "src/pages/SettingPage";
import ShopPage from "src/pages/ShopPage";
import { queryPoint, useMediaQuery } from 'hooks/useMediaQuery'
import React from 'react'
import { getUserInfo } from "utils/localStorage";
import { PATHS } from "./path";
import PlayRoomPage from "pages/PlayRoomPage";
import UserInfoMobile from "pages/ProfilePage/components/UserInfoMobile";
import GiftHistMobile from "pages/ProfilePage/components/GiftHistMobile";
import SettingMobile from "pages/ProfilePage/components/SettingMobile";

// export function RouteList(isMobile) {
  
//   return [
//     {
//       element: <MainLayout />,
//       children: [
//         {
//           path: "/",
//           element: <HomePage />,
//         },
//         {
//           path: "/shop",
//           element: <ShopPage />,
//         },
//         {
//           path: "/prize",
//           element: <PrizePage />,
//         },
//         {
//           path: "/rank",
//           element: <RankPage />,
//         },
//         {
//           path: '/profile',
//           element: <ProfilePage />
//         },
//         {
//           element: <RoomPageLayout />,
//           children: [
//             ...[
//               isMobile
//                 ? {}
//                 :
//                   {
//                     path: "/room/:roomId",
//                     element: <RoomPage />,
//                   },
//             ],
//           ],
//         },
//         {
//           path: "/:type",
//           element: <SettingPage />,
//         }
//       ],
//     },
//     {
//       element: <SubLayout />,
//       children: [
//         {
//           element: <RoomPageLayout />,
//           children: [
//             {
//               path: "/room/:roomId",
//               element: <RoomPage />,
//             }
//           ]
//         }
//       ]
//     }
//   ];
// }

const RouteList = () => {
  const [isMobile, setIsMobile] = React.useState(false)
  const isMobileMD = useMediaQuery(`(max-width: ${queryPoint.md}px)`)
  const user = getUserInfo()

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < queryPoint.md) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }
  , [])
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path={PATHS.SHOP_PAGE} element={<ShopPage />} />
        <Route path={PATHS.PRIZE_PAGE} element={<PrizePage />} />
        <Route path={PATHS.RANK_PAGE} element={<RankPage />} />
        {
          // user && <Route path="/profile" element={<ProfilePage />} />
        }
        <Route path={PATHS.PROFILE_PAGE} element={<ProfilePage />} />
        <Route path={PATHS.ROOM_PAGE} element={<RoomPageLayout />}>
          {
            isMobile ? null : <Route index element={<RoomPage />} />
          }
          {!isMobileMD && <Route path={PATHS.PLAYROOM_PAGE} element={<PlayRoomPage/>}/>}
        </Route>
        <Route path={PATHS.SETTING_PAGE} element={<SettingPage />} />

      </Route>
      <Route element={<SubLayout />}>
        <Route path={PATHS.ROOM_PAGE} element={<RoomPageLayout />}>
          <Route index element={<RoomPage />} />
        </Route>

        <Route path={PATHS.MY_ACCOUNT} element={<UserInfoMobile />} />
        <Route path={PATHS.GIFT_HIST} element={<GiftHistMobile />} />
        <Route path={PATHS.SETTING} element={<SettingMobile />} />
      </Route>

    </Routes>
  )
}

export default RouteList;
