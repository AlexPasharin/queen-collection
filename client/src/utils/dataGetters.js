import { fetchArtistTypes, fetchArtists, fetchEntries, fetchEntry, fetchReleases, fetchRelease } from './apiCalls'
import { sortBy, sortByReleaseDate } from './dataHelpers'

const getArtists = () => fetchArtists().then(sortBy('name'))
const getArtistTypes = artistID => fetchArtistTypes(artistID).then(sortBy('name'))
const getEntries = (artistID, type) => fetchEntries(artistID, type).then(sortByReleaseDate)

export const getReleases = entryID => fetchReleases(entryID).then(sortByReleaseDate)
export const getRelease = releaseID => fetchRelease(releaseID)
export const getEntry = entryID => fetchEntry(entryID)

export const getArtistsData = async (preferredSelectedArtist, preferredSelectedType) => {
  const artists = await getArtists()

  let selectedArtist

  if (preferredSelectedArtist && preferredSelectedArtist.id) {
    selectedArtist = artists.find(a => a.id === Number(preferredSelectedArtist.id))
  } else if (preferredSelectedArtist) {
    selectedArtist = artists.find(a => a.name.toLowerCase() === preferredSelectedArtist.name.toLowerCase())
  }

  if (!selectedArtist) {
    selectedArtist = artists[0]
  }

  return ({
    artists,
    ...(await getArtistData(selectedArtist, preferredSelectedType))
  })
}

export const getArtistData = async (artist, typeRequest) => {
  if (!artist)
    return ({
      selectedArtist: null,
      entries: [],
    })

  const types = await getArtistTypes(artist.id)

  let selectedType

  if (typeRequest && typeRequest.id) {
    selectedType = types.find(t => t.id === Number(typeRequest.id))
  } else if (typeRequest) {
    selectedType = types.find(t => t.name.toLowerCase() === typeRequest.name.toLowerCase())
  }

  if (!selectedType)
    selectedType = types[0]

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
