import * as api from './apiCalls'
import { sortBy, sortByReleaseDate } from './dataHelpers'

export const getArtists = () => api.fetchArtists().then(sortBy('name'))
export const getArtistTypes = artistID => api.fetchArtistTypes(artistID).then(sortBy('name'))

export const getReleases = entryID => api.fetchReleases(entryID).then(sortByReleaseDate)
export const getRelease = releaseID => api.fetchRelease(releaseID)
export const getEntry = entryID => api.fetchEntry(entryID)

export const getLabels = () => api.fetchLabels().then(sortBy('name'))
export const getFormats = () => api.fetchFormats().then(sortBy('id'))
export const getCountries = () => api.fetchCountries()

export const getEntries = (artist, type, artists) =>
  api.fetchEntries(artist.id, type.id)
    .then(sortByReleaseDate)
    .then(entries => entries.map(e => {
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
