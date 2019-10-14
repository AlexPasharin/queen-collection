import React from 'react'

import AppRoutes from "./AppRoutes"
import AuthController from "./context/AuthContext"

import './styles/App.css'

const App = () => (
  <AuthController>
    <AppRoutes />
  </AuthController>
)

export default App
