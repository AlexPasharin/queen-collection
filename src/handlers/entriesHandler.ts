import * as moment from 'moment'

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

const formatDate = date => {
  const dateAsMoment = moment(date)
  if (date.length === 4)
    return dateAsMoment.format('YYYY')
  else if (date.length === 7)
    return dateAsMoment.format('MMMM YYYY')
  else
    return moment(dateAsMoment).format('D MMMM YYYY')
}

const formatDates = entries =>
  entries.map(e => ({
    ...e,
    release_date: formatDate(e.release_date)
  }))

const entriesHandler = (artistID: number, typeID: number, dbConnection) =>
  Promise.all([
    dbConnection
      .select('name')
      .from('artist')
      .where({
        id: artistID,
      }),
      dbConnection
      .select('name')
      .from('type')
      .where({
        id: typeID,
      }),
    dbConnection
      .select()
      .from('Discography_entry')
      .where({
        artist_id: artistID,
        type: typeID,
      })
  ]).then(([artist, type, entries]) => {
    if (artist.length !== 1) {
      return null
    }

    return ({
      artist: artist[0].name,
      type: normalizeTypeName(type[0].name),
      entries: formatDates(entries.sort(compareEntries)),
    })
  })

export default entriesHandler
