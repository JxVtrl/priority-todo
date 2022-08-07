import { AppRoutes } from '../routes'
import { AuthGoogleProvider, ToolsProvider, FirebaseProvider } from '../context'
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      <ToolsProvider>
        <AuthGoogleProvider>
          <FirebaseProvider>
              <AppRoutes />
          </FirebaseProvider>
        </AuthGoogleProvider>
      </ToolsProvider>
    </ChakraProvider>
  )
}

export default App