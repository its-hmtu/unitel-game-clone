import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'src/App'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import "styles/index.scss"
import { RouteList } from './routes'

const router = createBrowserRouter(
  [
    ...RouteList()
  ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
