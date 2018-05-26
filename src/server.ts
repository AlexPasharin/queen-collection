import * as express from 'express'
import entriesHandler from './handlers/entriesHandler'

const server = dbConnection => {
  const app = express()

  app.set('view engine', 'ejs')

  app.use('/assets', express.static('assets'))

  app.get('/artists', async (req, res) => {
    dbConnection.query(
      `
        select distinct a.id, a.name
        from artist as a join Discography_entry as e
        on a.id=e.artist_id
        order by a.id
      `
    ).then(artists =>
      res.render('artists', {artists})
    ).catch(err => {
      console.log(err.stack)
      res.status(500).send('Could not retrieve artists from the database')
    })
  })

  app.get('/entries', (req, res) => {
    const {artist} = req.query

    entriesHandler(artist, dbConnection)
      .then(data => {
        if (!data) {
          res.status(404).send('Artist is not in the database')
          return
        }

        res.render('entries', data)
      })
      .catch(err => {
        console.log(err.stack)
        res.status(500).send('Could not retrieve artist\'s entries from the database')
      })
  })

  app.get('/types', (req, res) => {
    const {artist} = req.query

    dbConnection.query(
      `
      SELECT DISTINCT t.id, t.name
      FROM discography_entry e
      JOIN type t
      ON e.type = t.id
      WHERE e.artist_id=?
      ORDER BY t.id
      `,
      [artist]
    ).then(data => {
      res.send(data)
    }).catch(err => {
      console.log(err.stack)
      res.status(500).send('Could not retrieve artist\'s entry types from the database')
    })
  })


  return app
}

export default server
