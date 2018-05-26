import {Connection} from 'promise-mysql'

const normalizeTypeName = (typeName: string) =>
  `${typeName[0].toUpperCase()}${typeName.slice(1)}s`

const compareEntries = (entry1, entry2) => {
  const {release_date: date1} = entry1
  const {release_date: date2} = entry2

  const year1 = date1? +date1.slice(0, 4) : 10000
  const year2 = date2? +date2.slice(0, 4) : 10000

  if (year1 !== year2) return year1 - year2

  const month1 = date1.length > 4? +date1.slice(5, 7) : 13
  const month2 = date2.length > 4? +date2.slice(5, 7) : 13

  if (month1 != month2) return month1 - month2

  const day1 = date1.length > 7? +date1.slice(8, 10) : 32
  const day2 = date2.length > 7? +date2.slice(8, 10) : 32

  return day1 != day2 ? day1 - day2 : entry1.name < entry2.name ? -1 : 1
}

const resortEntriesByTypes = (entries: any[], types) =>
  types
    .map(type => ({
      name: normalizeTypeName(type.name),
      entries: entries
        .filter(entry => entry.type === type.id)
        .sort(compareEntries)
    }))
    .filter(category => category.entries.length)

const entriesHandler = (artist: string, dbConnection: Connection) =>
  Promise.all([
    dbConnection.query(
      'SELECT name FROM ARTIST WHERE id=?',
      [artist]
    ),
    dbConnection.query(
      'SELECT * FROM Discography_entry WHERE artist_id=?',
      [artist]
    ),
    dbConnection.query(
      'SELECT * FROM Type ORDER BY id'
    )
  ]).then(([artist, entries, types]) => {

    if (artist.length !== 1) {
      return null
    }

    return ({
      name: artist[0].name,
      categories: resortEntriesByTypes(entries, types)
    })
  })
  .catch(err => {
    throw err
  })

export default entriesHandler
