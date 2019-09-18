import * as api from './apiCalls'
import { sortBy, sortByReleaseDate } from './dataHelpers'
import { decode } from './stringHelpers'

export const getArtists = () => api.fetchArtists().then(sortBy('name'))
export const getArtistTypes = artistID => api.fetchArtistTypes(artistID).then(sortBy('name'))

export const getReleases = entryID => api.fetchReleases(entryID).then(sortByReleaseDate)
export const getRelease = releaseID => api.fetchRelease(releaseID)
export const getEntry = entryID => api.fetchEntry(entryID)

export const getLabels = () => api.fetchLabels().then(sortBy('name'))
export const getFormats = () => api.fetchFormats().then(sortBy('id'))
export const getCountries = () => api.fetchCountries()

export const getArtistData = async (preferredArtistName, preferredTypeName, artists) => {
  if (!preferredArtistName)
    return ({
      selectedArtist: null,
      types: [],
      selectedType: null,
      entries: [],
    })

  const selectedArtist = artists.find(a => a.name.toLowerCase() === decode(preferredArtistName).toLowerCase())

  if (!selectedArtist)
    return ({
      selectedArtist: null,
      types: [],
      selectedType: null,
      entries: [],
      artistDoesntExistError: true,
    })

  return getArtistTypes(selectedArtist.id)
    .then(async types => {
      const selectedType = preferredTypeName ?
        types.find(t => t.name.toLowerCase() === decode(preferredTypeName).toLowerCase()) :
        types.length === 1 ? types[0] : null

      return ({
        selectedArtist,
        types,
        artistTypesLoading: false,
        ...(await getTypeData(selectedArtist, selectedType, artists))
      })
    })
    .catch(() => ({
      selectedArtist,
      types: [],
      selectedType: null,
      entries: [],
      typesFetchingError: true,
      artistTypesLoading: false
    }))
}

export const getTypeData = async (artist, type, artists) => ({
  selectedType: type,
  entries: artist && type ? await getEntries(artist, type, artists) : []
})

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
