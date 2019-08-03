import * as api from './apiCalls'
import { sortBy, sortByReleaseDate } from './dataHelpers'

const getArtists = () => api.fetchArtists().then(sortBy('name'))
const getArtistTypes = artistID => api.fetchArtistTypes(artistID).then(sortBy('name'))
const getEntries = (artistID, type) => api.fetchEntries(artistID, type).then(sortByReleaseDate)

export const getReleases = entryID => api.fetchReleases(entryID).then(sortByReleaseDate)
export const getRelease = releaseID => api.fetchRelease(releaseID)
export const getEntry = entryID => api.fetchEntry(entryID)

export const getLabels = () => api.fetchLabels().then(sortBy('name'))
export const getFormats = () => api.fetchFormats().then(sortBy('id'))
export const getCountries = () => api.fetchCountries()

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
