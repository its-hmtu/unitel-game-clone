import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'styles/index.scss'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import SnackBarProvider from 'contexts/SnackBarContext'
import RoomSearchProvider from 'contexts/RoomSearchContext'
import SocketProvider from 'contexts/SocketContext'

const clientQuery = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={clientQuery}>
    <React.StrictMode>
      <SocketProvider>
        <SnackBarProvider>
          <RoomSearchProvider>
            <App /> 
          </RoomSearchProvider>
        </SnackBarProvider>
      </SocketProvider>
    </React.StrictMode>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
