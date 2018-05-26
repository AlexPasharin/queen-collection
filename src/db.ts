import * as sql from 'promise-mysql'

const establishDBConnection = () =>
  sql.createConnection({
    database: 'QueenCollection',
    user: 'root'
  }).then(connection => {
    connection.query = connection.query.bind(connection)

    return connection
  })

export default establishDBConnection
