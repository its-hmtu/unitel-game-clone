import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { RouteList } from '../routes'
import { Provider } from 'react-redux'
import store from '../store'
import { queryPoint } from 'src/utils/hooks'

const App = () => {
  const [isMobile, setIsMobile] = React.useState(false)

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

  const routeList = RouteList(isMobile)
  const router = createBrowserRouter([...routeList])
  return (
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  )
}

export default App