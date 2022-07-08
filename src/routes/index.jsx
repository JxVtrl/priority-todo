import React, { Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Spinner, Center } from '@chakra-ui/react'
import { GlobalLayout, LoginLayout } from '../layout'
import { Home, Login } from '../pages'

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom'

export const routesObject = {
  home: 'home',
  login: 'login'
}

const { home, login } = routesObject

const RoutesDeclaration = () => {
  const location = useLocation()

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route
          path={`/${home}`}
          element={
            <GlobalLayout>
              <Home />
            </GlobalLayout>
          }
        />
        <Route
          path={`/${login}`}
          element={
            <LoginLayout>
              <Login />
            </LoginLayout>
          }
        />
        <Route
          path="*"
          element={<Navigate to={`/${home}`} replace />}
        />
      </Routes>
    </AnimatePresence>
  )
}

export const AppRoutes = () => (
  <BrowserRouter>
    <Suspense
      fallback={
        <Center height="100%">
          <Spinner h={20} w={20} />
        </Center>  
      }
    >
      <RoutesDeclaration />
    </Suspense>
  </BrowserRouter>
)
