import { fetchArtistTypes, fetchArtists, fetchEntries } from './apiCalls'
import { sortBy, sortByReleaseDate } from './dataHelpers'

export const getArtists = () => fetchArtists().then(sortBy('name'))
export const getArtistTypes = artistID => fetchArtistTypes(artistID).then(sortBy('name'))
export const getEntries = (artistID, type) => fetchEntries(artistID, type).then(sortByReleaseDate)
