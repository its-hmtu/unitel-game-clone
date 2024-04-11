import MainLayout from "src/layout/MainLayout";
import HomePage from "src/pages/HomePage";

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
          element: <HomePage />
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