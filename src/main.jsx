import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes.jsx'
import AuthProvider from './Provider/Authprovider.jsx'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { store } from './app/store.js'

const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster></Toaster>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </AuthProvider>
  </Provider>
)
