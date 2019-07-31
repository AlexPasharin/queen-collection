import * as knex from 'knex'

export class dbConnection {
  dbInstance = knex({
    client: 'mysql',
    connection: {
      user: 'root',
      database: 'QueenCollection'
    }
  })

  getArtists = () => this.dbInstance('Artist').select()

  getArtistTypes = (artistID: number) => this.dbInstance
    .distinct('t.id', 't.name')
    .select()
    .from('type as t')
    .leftJoin(
      'Discography_entry as e',
      'e.type',
      't.id',
    )
    .where('artist_id', artistID)

  getEntriesByArtistAndType = (artistID: number, typeID: number) =>
    this.dbInstance
      .select()
      .from('Discography_entry')
      .where({
        artist_id: artistID,
        type: typeID,
      })

  getReleases = (entry: number) =>
    this.dbInstance
      .select()
      .from('Release')
      .where({
        entry_id: entry
      })

  getRelease = (id: Number) =>
    this.dbInstance
      .table('Release')
      .first()
      .where({
        id
      })

  getEntry = (id: Number) =>
    this.dbInstance
      .table('Discography_entry')
      .first()
      .where({
        id
      })
}

export default (new dbConnection)
