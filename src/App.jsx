import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Demo } from './Demo.jsx'

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Demo />
    </QueryClientProvider>
  )
}
