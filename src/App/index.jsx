import { useState } from 'react'
import { AppRoutes } from '../routes'
import { AppProvider } from '../context'
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </ChakraProvider>
  )
}

export default App