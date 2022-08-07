import React, { Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Spinner, Center } from '@chakra-ui/react'
import { GlobalLayout, LoginLayout } from '../layout'
import { Home, Login } from '../pages'
import { PrivateRoute, PrivateLoginRoute } from './Private'

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom'

const RoutesDeclaration = () => {
  const location = useLocation()

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes
        location={location}
        key={location.pathname}
      >
        <Route
          path={`/`}
          Exact
          element={
            <PrivateRoute>
              <GlobalLayout>
                <Home />
              </GlobalLayout>
            </PrivateRoute>
          }
        />
        <Route
          path={`/login`}
          Exact
          element={
            <PrivateLoginRoute>
              <LoginLayout>
                <Login />
              </LoginLayout>
            </PrivateLoginRoute>
          }
        />
        <Route
          path="*"
          element={<Navigate to={`/`} replace />}
        />
      </Routes>
    </AnimatePresence>
  )
}

export const AppRoutes = () => (
  <Suspense
    fallback={
      <Center height="100%">
        <Spinner h={20} w={20} />
      </Center>  
    }
  >
    <RoutesDeclaration />
  </Suspense>
)
