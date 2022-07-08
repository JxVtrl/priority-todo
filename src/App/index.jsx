import { useState } from 'react'
import { AppRoutes } from '../routes'
import { AppProvider } from '../context'

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  )
}

export default App