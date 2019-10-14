import React, { useState } from 'react'

export const authContext = React.createContext()

const AuthController = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false)

  const login = () => {
    setAuthenticated(true)
  }

  const logout = () => {
    setAuthenticated(false)
  }

  return (
    <authContext.Provider value={{ authenticated, login, logout }} >
      {children}
    </authContext.Provider>
  )
}

export default AuthController

