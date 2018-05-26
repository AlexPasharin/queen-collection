import establishDBConnection from './src/db'
import server from './src/server'

establishDBConnection()
  .then(dbConnection => {
    console.log('connected to the database successfully')

    const app = server(dbConnection)

    const PORT = 2000
    app.listen(PORT, err => {
      if (err) {
        console.log('Could not start the server ', err.stack)
        process.exit(1)
      }
      console.log(`Listening on port ${PORT}`)
    })
  })
  .catch(err => {
    console.error('error connecting to the database: ' + err.stack)
    process.exit(1)
  })

