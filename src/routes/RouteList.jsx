import MainLayout from "src/layout/MainLayout";
import HomePage from "src/pages/HomePage";
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
          element: <HomePage />
        },
        {
          path: "/rank",
          element: <HomePage />
        }
      ] 
    }
  ]
}