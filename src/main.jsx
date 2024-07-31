import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'styles/index.scss'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { setSocketRoomId, socket, SocketContext } from 'utils/socket'
import SnackBarProvider from 'contexts/SnackBarContext'
import RoomSearchProvider from 'contexts/RoomSearchContext'

const clientQuery = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={clientQuery}>
    <React.StrictMode>
      <SocketContext.Provider value={{socket, setSocketRoomId}}>
        <SnackBarProvider>
          <RoomSearchProvider>
            <App /> 
          </RoomSearchProvider>
        </SnackBarProvider>
      </SocketContext.Provider>
    </React.StrictMode>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
