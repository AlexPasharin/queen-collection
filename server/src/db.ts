import * as knex from 'knex'

const dBConnection =
  knex({
    client: 'mysql',
    connection: {
      user: 'root',
      database: 'QueenCollection'
    }
  })

export default dBConnection
