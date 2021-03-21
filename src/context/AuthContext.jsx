import * as Cookies from 'js-cookie'
import React, { useState } from 'react'

export const authContext = React.createContext()

export default  ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false)

  const login = password => {
    setAuthenticated(true)
    Cookies.set(process.env.REACT_APP_COOKIE_NAME, password, { expires: 7 })
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

