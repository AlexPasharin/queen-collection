import React, { useState, useEffect } from 'react'

import EntriesMain from "../src/components/Entries/EntriesMain.jsx"
import Tracks from "../src/components/Tracks/Tracks.jsx"

const App = () => {
  const [mode, setMode] = useState(null)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)

    const tracksMode = urlParams.get("tracks")
    setMode(!!tracksMode)
  }, [])

  if (mode === null)
    return "Loading app..."

  return mode ? <Tracks /> : <EntriesMain />;
}

export default App;
