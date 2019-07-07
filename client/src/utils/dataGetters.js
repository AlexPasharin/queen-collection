import { fetchArtistTypes, fetchArtists, fetchEntries, fetchReleases } from './apiCalls'
import { sortBy, sortByReleaseDate } from './dataHelpers'

const getArtists = () => fetchArtists().then(sortBy('name'))
const getArtistTypes = artistID => fetchArtistTypes(artistID).then(sortBy('name'))
const getEntries = (artistID, type) => fetchEntries(artistID, type).then(sortByReleaseDate)
export const getReleases = entryID => fetchReleases(entryID).then(sortByReleaseDate)

export const getArtistsData = async (preferredSelectedArtistName, preferredSelectedTypeName) => {
  const artists = await getArtists()

  let selectedArtistIdx = artists.findIndex(a => a.name.toLowerCase() === preferredSelectedArtistName.toLowerCase())

  if (selectedArtistIdx < 0) {
    selectedArtistIdx = 0
  }

  return ({
    artists,
    ...(await getArtistData(artists, selectedArtistIdx, preferredSelectedTypeName))
  })
}

export const getArtistData = async (artists, artistIdx, typeRequestString) => {
  const types = await getArtistTypes(artists[artistIdx].id)

  let selectedTypeIdx = (typeRequestString && types.findIndex(
    t => t.name.toLowerCase() === typeRequestString.toLowerCase()
  ))

  if (!selectedTypeIdx || selectedTypeIdx < 0) {
    selectedTypeIdx = 0
  }

  return ({
    selectedArtistIdx: artistIdx,
    types,
    ...(await getTypeData(artists, types, artistIdx, selectedTypeIdx))
  })
}

export const getTypeData = async (artists, types, artistIdx, typeIdx) => ({
  selectedTypeIdx: typeIdx,
  entries: await getEntries(artists[artistIdx].id, types[typeIdx].id)
})
