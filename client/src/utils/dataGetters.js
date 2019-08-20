import * as api from './apiCalls'
import { groupBy, map, sortBy, sortByReleaseDate, values } from './dataHelpers'

const getArtists = () => api.fetchArtists().then(sortBy('name'))
const getArtistTypes = artistID => api.fetchArtistTypes(artistID).then(sortBy('name'))
const getEntries = (artist, type, artists) =>
  api.fetchEntries(artist.id, type.id)
    .then(sortByReleaseDate)
    .then(entries => entries.map(
      e => {
        let entryArtistName

        if (e.entry_artist_id && e.entry_artist_id !== artist.id) {
          const entryArtist = artists.find(a => a.id === e.entry_artist_id)
          entryArtistName = entryArtist ? entryArtist.name : undefined
        }

        return ({
          ...e,
          artistName: artist.name,
          typeName: type.name,
          entryArtistName
        })
      }
    ))

export const getReleases = entryID => api.fetchReleases(entryID).then(sortByReleaseDate)
export const getRelease = releaseID => api.fetchRelease(releaseID)
export const getEntry = entryID => api.fetchEntry(entryID)

export const getReleaseTracks = releaseID => api.fetchReleaseTracks(releaseID)
  .then(groupBy('place'))
  .then(res => map(res, sortBy('number')))
  .then(values)

export const getCompositions = () => api.fetchCompositions().then(sortBy('name'))

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
    ...(await getArtistData(selectedArtist, preferredSelectedType, artists))
  })
}

export const getArtistData = async (artist, typeRequest, artists) => {
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
    ...(await getTypeData(artist, selectedType, artists))
  })
}

export const getTypeData = async (artist, type, artists) => ({
  selectedType: type,
  entries: artist && type ? await getEntries(artist, type, artists) : []
})
