import { AppRoutes } from '../routes'
import { AuthGoogleProvider, ToolsProvider, FirebaseProvider } from '../context'
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      <ToolsProvider>
        <FirebaseProvider>
          <AuthGoogleProvider>
            <AppRoutes />
          </AuthGoogleProvider>
        </FirebaseProvider>
      </ToolsProvider>
    </ChakraProvider>
  )
}

export default App