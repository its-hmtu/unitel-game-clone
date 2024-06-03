import { useSelector } from "react-redux";
import { useRoutes } from "react-router-dom";
import MainLayout from "src/layout/MainLayout";
import RoomPageLayout from "src/layout/RoomPageLayout";
import SubLayout from "src/layout/SubLayout";
import HomePage from "src/pages/HomePage";
import PrizePage from "src/pages/PrizePage";
import RankPage from "src/pages/RankPage";
import RoomPage from "src/pages/RoomPage";
import SettingPage from "src/pages/SettingPage";
import ShopPage from "src/pages/ShopPage";

export function RouteList(isMobile) {
  
  return [
    {
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/shop",
          element: <ShopPage />,
        },
        {
          path: "/prize",
          element: <PrizePage />,
        },
        {
          path: "/rank",
          element: <RankPage />,
        },
        {
          element: <RoomPageLayout />,
          children: [
            ...[
              isMobile
                ? {}
                :
                  {
                    path: "/room/:roomId",
                    element: <RoomPage />,
                  },
            ],
          ],
        },
        {
          path: "/:type",
          element: <SettingPage />,
        }
      ],
    },
    {
      element: <SubLayout />,
      children: [
        {
          element: <RoomPageLayout />,
          children: [
            {
              path: "/room/:roomId",
              element: <RoomPage />,
            }
          ]
        }
      ]
    }
  ];
}
