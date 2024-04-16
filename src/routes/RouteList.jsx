import MainLayout from "src/layout/MainLayout";
import HomePage from "src/pages/HomePage";
import PrizePage from "src/pages/PrizePage";
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
          element: <HomePage />
        }
      ] 
    }
  ]
}