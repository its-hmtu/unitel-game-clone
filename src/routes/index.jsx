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
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/prize" element={<PrizePage />} />
        <Route path="/rank" element={<RankPage />} />
        {
          // user && <Route path="/profile" element={<ProfilePage />} />
        }
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/room/:roomId" element={<RoomPageLayout />}>
          {
            isMobile ? null : <Route index element={<RoomPage />} />
          }
          {!isMobileMD && <Route path={PATHS.PLAYROOM_PAGE} element={<PlayRoomPage/>}/>}
        </Route>
        <Route path="/:type" element={<SettingPage />} />

      </Route>
      <Route element={<SubLayout />}>
        <Route path="/room/:roomId" element={<RoomPageLayout />}>
          <Route index element={<RoomPage />} />
        </Route>
      </Route>

    </Routes>
  )
}

export default RouteList;
