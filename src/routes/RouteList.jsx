import MainLayout from "src/layout/MainLayout";
import HomePage from "src/pages/HomePage";
import PrizePage from "src/pages/PrizePage";
import RankPage from "src/pages/RankPage";
import RoomPage from "src/pages/RoomPage";
import ShopPage from "src/pages/ShopPage";

export function RouteList() {
  return [
    {
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />
        },
        {
          path: "/shop",
          element: <ShopPage />
        },
        {
          path: "/prize",
          element: <PrizePage />
        },
        {
          path: "/rank",
          element: <RankPage />
        },
        {
          path: "/room/:roomId",
          element: <RoomPage />
        }
      ] 
    }
  ]
}