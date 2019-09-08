import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import EntriesContainer from "../src/components/Entries/EntriesContainer"
// import Tracks from "../src/components/Tracks/Tracks.jsx"

const App = () => {

  return (
    <Router>
      <Switch>
        <Route path="/entries/:artist?/:type?" component={EntriesContainer} />
        {/* TODO: route for tracks */}
        <Redirect to="/entries" />
      </Switch>
    </Router>
  )
}

export default App;
