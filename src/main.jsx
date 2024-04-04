import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'src/App'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import "styles/index.scss"

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />
    },

    {
      path: '/shop',
      element: <App />
    },

    {
      path: '/prize',
      element: <App />
    },

    {
      path: '/rank',
      element: <App />
    },

    {
      path: '/spine',
      element: <App />
    },

    {
      path: '/more',
      element: <App />
    },
  ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
