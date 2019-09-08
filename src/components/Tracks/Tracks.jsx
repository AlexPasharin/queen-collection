import React, { useState, useEffect } from "react"

import { getCompositions } from "../../utils/dataGetters"

const Tracks = () => {
  const [compositions, setCompositions] = useState(null)

  useEffect(() => {
    getCompositions().then(compositions => {
      setCompositions(compositions)
    })
  }, [])

  if (!compositions) {
    return "Loading tracks..."
  }

  return (
    <ul>
      {compositions.map(c => <li key={c.id}>{c.name}</li>)}
    </ul>)

}

export default Tracks
