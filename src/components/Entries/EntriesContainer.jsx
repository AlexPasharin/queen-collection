import React, { useState, useEffect } from 'react'

import { getArtists, getArtistTypes, getEntries } from '../../utils/dataGetters'
import { encode, decode } from '../../utils/stringHelpers'
import EntriesMain from './EntriesMain'

const update = (artist, type, history) => {
  const url = `/entries/${encode(artist.toLowerCase())}${type ? `/${encode(type.toLowerCase())}` : ""}`
  history.push(url)
}

const findByName = (arr, value) =>
  arr.find(a => a.name.toLowerCase() === decode(value).toLowerCase())

const EntriesContainer = ({ match, history }) => {
  const { artist = "", type = "" } = match.params

  const [{ artists, artistsLoading, artistsFetchFailed }, setArtists] = useState({
    artists: [],
    artistsLoading: true,
    artistsFetchFailed: false
  })

  const [{ types, typesLoading, typesLoaded, typesFetchFailed }, setTypes] = useState({
    types: [],
    typesLoading: false,
    typesLoaded: true,
    typesFetchFailed: false
  })

  const [{ entries, entriesLoading, entriesLoaded, entriesFetchFailed }, setEntries] = useState({
    entries: [],
    entriesLoading: false,
    entriesLoaded: true,
    entriesFetchFailed: false
  })

  const selectedArtist = findByName(artists, artist)
  const selectedType = findByName(types, type)

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
    setTypes({
      types: [],
      typesLoading: !!selectedArtist,
      typesLoaded: false,
      typesFetchFailed: false
    })
  }, [selectedArtist])

  useEffect(() => {
    if (typesLoading && selectedArtist) {
      getArtistTypes(selectedArtist.id)
        .then(types => {
          setTypes({
            types,
            typesLoading: false,
            typesLoaded: true,
            typesFetchFailed: false,
          })
        }).catch(() => {
          setTypes({
            types: [],
            typesLoading: false,
            typesLoaded: false,
            typesFetchFailed: true,
          })
        })
    }
  }, [typesLoading])

  useEffect(() => {
    setEntries({
      entries: [],
      entriesLoading: !!selectedType,
      entriesLoaded: false,
      entriesFetchFailed: false
    })
  }, [selectedType])

  useEffect(() => {
    if (entriesLoading && selectedArtist && selectedType) {
      getEntries(selectedArtist, selectedType, artists)
        .then(entries => {
          setEntries({
            entries,
            entriesLoading: false,
            entriesLoaded: true,
            entriesFetchFailed: false
          })
        }).catch(() => {
          setEntries({
            entries: [],
            entriesLoading: false,
            entriesLoaded: false,
            entriesFetchFailed: true
          })
        })
    }
  }, [entriesLoading])

  useEffect(() => {
    if (types.length === 1) {
      updateType(types[0].name)
    }
  }, [types])

  let errorText
  let infoText

  if (artistsFetchFailed) errorText = "Error: Could not fetch artists from the database"
  else if (!artistsLoading && !artists.length) errorText = "Error: There are no artists in the database"
  else if (!artistsLoading && artist && !selectedArtist) errorText = `Error: Artist "${decode(artist)}" does not exist in the database`
  else if (typesFetchFailed && selectedArtist) errorText = `Error: Could not fetch record types of the artist ${selectedArtist.name} from the database`
  else if (typesLoaded && !types.length && selectedArtist) errorText = `Error: Artist ${selectedArtist.name} does not have any record types in the database`
  else if (type && typesLoaded && selectedArtist && !selectedType) errorText = `Error: Artist ${selectedArtist.name} does not have records of type ${decode(type)}`
  else if (entriesFetchFailed && selectedType && selectedArtist) errorText = `Error: Could not fetch records of type ${selectedType.name} of artist ${selectedArtist.name}`
  else if (entriesLoaded && selectedArtist && selectedType && !entries.length) errorText = `Error: Artist ${selectedArtist.name} does not have any records of type ${selectedType.name} in the database`

  if (artistsLoading) infoText = "Loading artists..."
  else if (!selectedArtist) infoText = "Select an artist"
  else if (typesLoading) infoText = "Loading record types..."
  else if (typesLoaded && !selectedType) infoText = "Select a record type"
  else if (entriesLoading) infoText = "Loading entries..."

  return (
    <EntriesMain
      artists={artists}
      types={types}
      entries={entries}
      selectedArtist={selectedArtist}
      selectedType={selectedType}
      updateArtist={updateArtist}
      updateType={updateType}
      errorText={errorText}
      infoText={infoText}
    />
  )
}

export default EntriesContainer
