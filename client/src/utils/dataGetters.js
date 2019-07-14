import { fetchArtistTypes, fetchArtists, fetchEntries, fetchReleases } from './apiCalls'
import { sortBy, sortByReleaseDate } from './dataHelpers'

const getArtists = () => fetchArtists().then(sortBy('name'))
const getArtistTypes = artistID => fetchArtistTypes(artistID).then(sortBy('name'))
const getEntries = (artistID, type) => fetchEntries(artistID, type).then(sortByReleaseDate)

export const getReleases = entryID => fetchReleases(entryID).then(sortByReleaseDate)

export const getArtistsData = async (preferredSelectedArtistName, preferredSelectedTypeName) => {
  const artists = await getArtists()

  let selectedArtist = artists.find(a => a.name.toLowerCase() === preferredSelectedArtistName.toLowerCase())

  if (!selectedArtist) {
    selectedArtist = artists[0]
  }

  return ({
    artists,
    ...(await getArtistData(selectedArtist, preferredSelectedTypeName))
  })
}

export const getArtistData = async (artist, typeRequestString) => {
  if (!artist)
    return ({
      selectedArtist: null,
      entries: []
    })

  const types = await getArtistTypes(artist.id)

  let selectedType = (typeRequestString && types.find(
    t => t.name.toLowerCase() === typeRequestString.toLowerCase()
  )) || types[0]

  return ({
    selectedArtist: artist,
    types,
    ...(await getTypeData(artist, selectedType))
  })
}

export const getTypeData = async (artist, type) => ({
  selectedType: type,
  entries: artist && type ? await getEntries(artist.id, type.id) : []
})
