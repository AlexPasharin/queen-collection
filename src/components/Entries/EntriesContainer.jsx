import React, { useState, useEffect } from 'react'

import { getArtists, getArtistData } from '../../utils/dataGetters'
import { encode, decode } from '../../utils/stringHelpers'
import EntriesMain from './EntriesMain'

const update = (artist, type, history) => {
  const url = `/entries/${encode(artist.toLowerCase())}${type ? `/${encode(type.toLowerCase())}` : ""}`
  history.push(url)
}

const EntriesContainer = ({ match, history }) => {
  const { artist, type } = match.params

  const [{ artists, artistsLoading, artistsFetchFailed }, setArtists] = useState({
    artistsLoading: true,
    artistsFetchFailed: false
  })

  const [selectedArtistData, setSelectedArtistData] = useState({
    types: [],
    entries: [],
    selectedArtist: null,
    selectedType: null,
    artistDoesntExistError: false,
    typesFetchingError: false,
    entriesFetcingError: false,
    artistTypesLoading: true
  })

  const updateArtist = newArtist => update(newArtist, null, history)
  const updateType = newType => update(artist, newType, history)

  useEffect(() => {
    getArtists()
      .then(artists => {
        setArtists({
          artists,
          artistsLoading: false,
          artistsFetchFailed: false
        })
      })
      .catch(() => {
        setArtists({
          artists: [],
          artistsLoading: false,
          artistsFetchFailed: true
        })
      })
  }, [])

  useEffect(() => {
    if (artists && artists.length) {
      getArtistData(artist, type, artists)
        .then(setSelectedArtistData)
    }
  }, [artist, type, artists])

  useEffect(() => {
    if (!type && selectedArtistData.selectedType) {
      updateType(selectedArtistData.selectedType.name)
    }
  }, [selectedArtistData.selectedType])

  let errorText
  let infoText

  if (artistsFetchFailed) errorText = "Error: Could not fetch artists from the database"
  else if (artists && !artists.length) errorText = "Error: There are no artists in the database"
  else if (selectedArtistData.artistDoesntExistError) errorText = `Error: Artist "${decode(artist)}" does not exist in the database`
  else if (selectedArtistData.typesFetchingError) errorText = `Error: Could not fetch record types of the artist ${selectedArtistData.selectedArtist.name} from the database`
  else if (selectedArtistData.selectedArtist && !selectedArtistData.types.length) errorText = `Error: Artist ${selectedArtistData.selectedArtist.name} does not have any record types in the database`
  else if (type && !selectedArtistData.artistTypesLoading && !selectedArtistData.selectedType) {
    errorText = `Error: Artist ${selectedArtistData.selectedArtist.name} does not have entries with type "${type}"`
  }

  if (artistsLoading) infoText = "Loading artists..."
  else if (!selectedArtistData.selectedArtist) infoText = "Select an artist"
  else if (!type) infoText = "Select a record type"

  return (
    <EntriesMain
      artists={artists}
      {...selectedArtistData}
      updateArtist={updateArtist}
      updateType={updateType}
      errorText={errorText}
      infoText={infoText}
    />
  )
}

export default EntriesContainer
