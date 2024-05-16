import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import "styles/index.scss"
import { RouteList } from './routes'
import { Provider } from 'react-redux'
import store from './store'

const routeList = RouteList()
const router = createBrowserRouter([...routeList])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
