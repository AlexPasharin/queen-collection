import React, { useEffect, useState } from 'react'

import { getArtists, getArtistTypes, getEntries } from '../../utils/dataGetters'
import { encode, decode } from '../../utils/stringHelpers'

import EntriesMain from './EntriesMain'

const update = (artist, type, history) => {
  const url = `/entries/${encode(artist)}${type ? `/${encode(type)}` : ""}`
  history.push(url)
}

const findByName = (arr, value) =>
  arr.find(a => a.name.toLowerCase() === decode(value).toLowerCase())


export default ({ match, history }) => {
  const { artist = "", type = "" } = match.params

  const [infoText, setInfoText] = useState("")
  const [errorText, setErrorText] = useState("")

  const updateArtist = newArtist => update(newArtist, null, history)
  const updateType = newType => update(artist, newType, history)

  const useFetchData = (fetchPromise, dependencies, loadingText, nullResultsErrorText, fetchingErrorText) => {
    const [data, setData] = useState([])

    useEffect(() => {
      setErrorText("")
      setData([])

      if (dependencies.every(d => !!d)) {
        setInfoText(loadingText())

        fetchPromise()
          .then(data => {
            if (data.length === 0) {
              setErrorText(nullResultsErrorText())
            } else {
              setData(data)
            }
          }).catch(() => {
            setErrorText(fetchingErrorText())
            setData([])
          }).finally(() => {
            setInfoText("")
          })
      }
    }, dependencies)

    return data
  }

  const artists = useFetchData(
    getArtists,
    [],
    () => "Loading artists...",
    () => "Error: There are no artists in the database",
    () => "Error: Could not fetch artists from the database"
  )

  const selectedArtist = findByName(artists, artist)

  const types = useFetchData(
    () => getArtistTypes(selectedArtist.id),
    [selectedArtist],
    () => "Loading record types...",
    () => `Error: Artist ${selectedArtist.name} does not have any record types in the database`,
    () => `Error: Could not fetch record types of the artist ${selectedArtist.name} from the database`
  )

  const selectedType = findByName(types, type)

  const entries = useFetchData(
    () => getEntries(selectedArtist, selectedType, artists),
    [selectedArtist, selectedType],
    () => "Loading entries...",
    () => `Error: Artist ${selectedArtist.name} does not have any records of type ${selectedType.name} in the database`,
    () => `Error: Could not fetch records of type ${selectedType.name} of artist ${selectedArtist.name}`
  )

  useEffect(() => {
    if (artists.length && artist && !selectedArtist) {
      setErrorText(`Error: Artist "${decode(artist)}" does not exist in the database`)
    }
  }, [artists, artist, selectedArtist])

  useEffect(() => {
    if (types.length === 1) {
      updateType(types[0].name)
    } else if (types.length && type && !selectedType && selectedArtist) {
      setErrorText(`Error: Artist ${selectedArtist.name} does not have records of type ${decode(type)}`)
    }
  }, [types, type, selectedType, selectedArtist])

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
      artistParam={artist}
      typeParam={type}
    />
  )
}
