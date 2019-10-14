import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import EntriesContainer from "./components/Entries/EntriesContainer"
import Login from "./components/Login/Login"
// import Tracks from "./components/Tracks/Tracks.jsx"

const AppRoutes = () => (
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

export default AppRoutes
