import { AppRoutes } from '../routes'
import { AppProvider, AuthGoogleProvider } from '../context'
import { ChakraProvider } from '@chakra-ui/react'
import { FirebaseProvider } from '../context/firebase'
import { ToolsProvider } from '../context/tools'

function App() {
  return (
    <ChakraProvider>
      <ToolsProvider>
        <FirebaseProvider>
          <AuthGoogleProvider>
            <AppProvider>
              <AppRoutes />
            </AppProvider>
          </AuthGoogleProvider>
        </FirebaseProvider>
      </ToolsProvider>
    </ChakraProvider>
  )
}

export default App