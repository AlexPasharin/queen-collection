import React from 'react'

import AppRoutes from "./AppRoutes"
import AuthController from "./context/AuthContext"

import './styles/App.css'

export default () => (
  <AuthController>
    <AppRoutes />
  </AuthController>
)
