import { AppRoutes } from '../routes'
import { AppProvider, AuthGoogleProvider } from '../context'
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      <AuthGoogleProvider>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </AuthGoogleProvider>
    </ChakraProvider>
  )
}

export default App