import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Demo } from './pages/Demo.jsx'
import { Login } from './pages/Login.jsx'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Demo />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
])

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </QueryClientProvider>
  )
}
