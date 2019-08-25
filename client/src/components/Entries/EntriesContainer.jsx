import React, { useState, useEffect } from 'react'

import { getArtists, getArtistData } from '../../utils/dataGetters'
import { encode } from '../../utils/stringHelpers'
import EntriesMain from './EntriesMain'

const update = (artist, type, history) => {
  const url = `/entries/${encode(artist.toLowerCase())}${type ? `/${encode(type.toLowerCase())}` : ""}`
  history.push(url)
}

const EntriesContainer = ({ match, history }) => {
  const { artist, type } = match.params
  console.log({ artist, type })

  const [{ artists, artistsLoading, artistsFetchFailed }, setArtists] = useState({
    artists: [],
    artistsLoading: true,
    artistsFetchFailed: false
  })

  const [selectedArtistData, setSelectedArtistData] = useState({
    types: [],
    entries: [],
    selectedArtist: null,
    selectedType: null
  })

  useEffect(() => {
    getArtists()
      .then(artists => {
        if (!artists.length) throw Error("No artists in the database")

        setArtists({
          artists,
          artistsLoading: false,
          artistsFetchFailed: false
        })
      })
      .catch(error => {
        setArtists({
          artistsLoading: false,
          artistsFetchFailed: true
        })

        console.group()
        console.error("Artists fetch failed")
        console.error(error)
        console.groupEnd()
      })
  }, [])

  useEffect(() => {
    if (artists && artists.length) {
      getArtistData(artist, type, artists)
        .then(setSelectedArtistData)
    }
  }, [artist, type, artists])

  if (artistsLoading) return <h1>Loading artists...</h1>

  if (artistsFetchFailed) return <h1>Could not fetch artists </h1>

  const updateArtist = newArtist => update(newArtist, type, history)
  const updateType = newType => update(artist, newType, history)

  return (
    <EntriesMain
      artists={artists}
      {...selectedArtistData}
      updateArtist={updateArtist}
      updateType={updateType}
    />
  )
}

export default EntriesContainer
