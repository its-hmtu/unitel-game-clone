import MainLayout from "src/layout/MainLayout";
import RoomPageLayout from "src/layout/RoomPageLayout";
import SubLayout from "src/layout/SubLayout";
import HomePage from "src/pages/HomePage";
import PrizePage from "src/pages/PrizePage";
import RankPage from "src/pages/RankPage";
import RoomPage from "src/pages/RoomPage";
import ShopPage from "src/pages/ShopPage";
import { queryPoint, useMediaQuery } from "src/utils/hooks";

export function RouteList() {
  const isMobile = useMediaQuery(`(max-width: ${queryPoint.md}px)`)
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
                : {
                    path: "/room/:roomId",
                    element: <RoomPage />,
                  },
            ],
          ],
        },
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
