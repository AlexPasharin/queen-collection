import entriesHandler from '../handlers/entriesHandler'
import {resortArtistsByGroups} from '../handlers/artistsHandler'

export const setUpAppEndPoints = (app, dBConnection) => {
  app.set('view engine', 'ejs')

  app.get('/artists', (_req, res) =>
  dBConnection
    .select('a.id', 'a.name', 'a.group', 'a.number_in_group')
    .distinct()
    .from('artist as a')
    .leftJoin(
      'Discography_entry as e',
      'a.id',
      'artist_id'
    )
    .orderBy('a.id')
    .then(artists => {
      const artistGroups = resortArtistsByGroups(artists)
      res.render('artists', {groups: artistGroups})
    }
    ).catch(err => {
      console.log(err.stack)
      res.status(500).send('Could not retrieve artists from the database')
    })
  )

  app.get('/entries', (req, res) => {
    const {artist, type} = req.query

    entriesHandler(Number(artist), Number(type), dBConnection)
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

  return app
}