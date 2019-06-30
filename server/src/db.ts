import * as knex from 'knex'

const dBConnection =
  knex({
    client: 'mysql',
    connection: {
      user: 'root',
      database: 'QueenCollection'
    }
  })

dBConnection.getArtists = () => dBConnection('Artist').select()

dBConnection.getArtistTypes = (artistID: number) => dBConnection
  .distinct('t.id', 't.name')
  .select()
  .from('type as t')
  .leftJoin(
    'Discography_entry as e',
    'e.type',
    't.id',
  )
  .where('artist_id', artistID)

dBConnection.getEntriesByArtistAndType = (artistID: number, typeID: number) =>
  dBConnection
    .select()
    .from('Discography_entry')
    .where({
      artist_id: artistID,
      type: typeID,
    })

export default dBConnection
