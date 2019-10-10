import React, { useEffect, useRef, useState } from 'react'

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

  const [artists, setArtists] = useState([])
  const [types, setTypes] = useState([])
  const [entries, setEntries] = useState([])

  const [infoText, setInfoText] = useState("")
  const [errorText, setErrorText] = useState("")

  const mainComponentRef = useRef()

  const selectedArtist = findByName(artists, artist)
  const selectedType = findByName(types, type)

  const updateArtist = newArtist => update(newArtist, null, history)
  const updateType = newType => update(artist, newType, history)

  useEffect(() => {
    setInfoText("Loading artists...")

    getArtists()
      .then(artists => {
        setArtists(artists)
        setInfoText("")

        if (artists.length === 0) {
          setErrorText("Error: There are no artists in the database")
        }
      })
      .catch(() => {
        setArtists([])
        setInfoText("")
        setErrorText("Error: Could not fetch artists from the database")
      })
  }, [])

  useEffect(() => {
    if (artists.length && !selectedArtist) {
      setInfoText("Select an artist")
      mainComponentRef.current.focusArtistsSelector()

      if (artist) {
        setErrorText(`Error: Artist "${decode(artist)}" does not exist in the database`)
      }
    }
  }, [artists, selectedArtist])

  useEffect(() => {
    if (!selectedType && types.length > 1) {
      setInfoText("Select a record type")
    }

    if (types.length && type && !selectedType && selectedArtist) {
      setErrorText(`Error: Artist ${selectedArtist.name} does not have records of type ${decode(type)}`)
    }
  }, [types])

  useEffect(() => {
    setErrorText("")
    setTypes([])

    if (selectedArtist) {
      setInfoText("Loading record types...")

      getArtistTypes(selectedArtist.id)
        .then(types => {
          setTypes(types)
          setInfoText("")

          if (types.length === 0) {
            setErrorText(`Error: Artist ${selectedArtist.name} does not have any record types in the database`)
          } else if (types.length === 1) {
            updateType(types[0].name)
          }
        }).catch(() => {
          setInfoText("")
          setErrorText(`Error: Could not fetch record types of the artist ${selectedArtist.name} from the database`)
          setTypes([])
        })
    }
  }, [selectedArtist])

  useEffect(() => {
    setErrorText("")
    setEntries([])

    if (selectedArtist && selectedType) {
      setInfoText("Loading entries...")

      getEntries(selectedArtist, selectedType, artists)
        .then(entries => {
          setEntries(entries)
          setInfoText("")

          if (entries.length === 0) {
            setErrorText(`Error: Artist ${selectedArtist.name} does not have any records of type ${selectedType.name} in the database`)
          }
        }).catch(() => {
          setEntries([])
          setInfoText("")
          setErrorText(`Error: Could not fetch records of type ${selectedType.name} of artist ${selectedArtist.name}`)
        })
    }
  }, [selectedType])

  return (
    <EntriesMain
      ref={mainComponentRef}
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
