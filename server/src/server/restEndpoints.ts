const successHandler = res => data => res.set("Access-Control-Allow-Origin", "*").json(data)

const errorHandler = (res, message) => err => {
  console.log(err.stack)
  res.status(500).send(message)
}

export const setUpRestEndPoints = (app, dBConnection) => {
  app.get('/rest/artists', (_, res) =>
    dBConnection
      .getArtists()
      .then(successHandler(res))
      .catch(errorHandler(res, 'Could not retrieve artists from the database'))
  )

  app.get('/rest/types', (req, res) =>
    dBConnection
      .getArtistTypes(Number(req.query.artist))
      .then(successHandler(res))
      .catch(errorHandler(res, 'Could not retrieve artist\'s entry types from the database'))
  )

  app.get('/rest/entries', (req, res) => {
    const { artist, type } = req.query

    dBConnection.getEntriesByArtistAndType(Number(artist), Number(type))
      .then(successHandler(res))
      .catch(errorHandler(res, 'Could not retrieve artist\'s entries from the database'))
  })

  return app
}
