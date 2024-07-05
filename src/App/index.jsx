import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import RouteList from 'routes'
import { Provider } from 'react-redux'
import store from '../store'

const App = () => {
  return (
    <Provider store={store}>
      {/* <RouterProvider router={router} /> */}
      <BrowserRouter>
        <RouteList />
      </BrowserRouter>
    </Provider>
  )
}

export default App