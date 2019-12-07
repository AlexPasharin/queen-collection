import * as Cookies from 'js-cookie'
import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import { authContext } from "./context/AuthContext"
import EntriesContainer from "./components/Entries/EntriesContainer"
import Login from "./components/Login/Login"
// import Tracks from "./components/Tracks/Tracks.jsx"
import { login as loginRequest } from './utils/apiCalls'

const AppRoutes = () => {
  const [loading, setLoading] = useState(true)
  const { login } = useContext(authContext)

  useEffect(() => {
    const cookieValue = Cookies.get(process.env.REACT_APP_COOKIE_NAME)

    if (!cookieValue) {
      setLoading(false)

      return
    }

    loginRequest(cookieValue)
      .then(({ authenticated }) => {
        if (authenticated) {
          login(cookieValue)
        }

        setLoading(false)
      })
  })

  if (loading) {
    return <div className="app-loading">Loading...</div>
  }

  return (
    <Router>
      <Switch>
        <Route path="/entries/:artist?/:type?" component={EntriesContainer} />
        <Route path="/login" component={Login} />
        {/* TODO: route for tracks */}
        {process.env.REACT_APP_INITIAL_DEFAULT === "LOGIN" ?
          <Redirect to="/login" /> :
          <Redirect to="/entries" />
        }
      </Switch>
    </Router>
  )
}

export default AppRoutes
