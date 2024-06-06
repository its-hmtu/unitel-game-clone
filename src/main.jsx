import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "styles/index.scss"
import { QueryClient, QueryClientProvider } from 'react-query'
const clientQuery = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={clientQuery}>
    <App />
  </QueryClientProvider>
)
