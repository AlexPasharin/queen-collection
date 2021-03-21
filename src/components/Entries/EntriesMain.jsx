import React, { useEffect, useRef, useState } from 'react'

import NavBar from '../NavBar/NavBar'
import Entries from './Entries'

export default ({
  artists,
  types,
  entries,
  selectedArtist,
  selectedType,
  errorText,
  infoText,
  artistParam,
  typeParam,
  updateArtist,
  updateType
}) => {
  const [entryFilterText, setEntryFilterText] = useState("")
  const [selectedEntryIdx, setSelectedEntryIdx] = useState(null)
  const [initialSelectedReleaseID, setInitialSelectedReleaseID] = useState(null)

  const artistsSelector = useRef()
  const typesSelector = useRef()
  const filterInput = useRef()
  const entriesSection = useRef()

  const onChangeEntryFilterText = value => {
    setEntryFilterText(value)
    setSelectedEntryIdx(null)
  }

  useEffect(() => {
    if (artists.length && !artistParam) {
      artistsSelector.current.focus()
    }
  }, [artists, artistParam])

  useEffect(() => {
    if (types.length > 1 && !typeParam) {
      typesSelector.current.focus()
    }
  }, [types, typeParam])

  useEffect(() => {
    if (filterInput.current) {
      filterInput.current.focus()
    } else if (types.length === 1 || entries.length === 1) {
      entriesSection.current && entriesSection.current.focus()
    }
  }, [entries, types])

  useEffect(() => {
    onChangeEntryFilterText("")
  }, [entries])

  const onSelectArtist = async artist => {
    if (artist) updateArtist(artist.name)
  }

  const onSelectType = async type => {
    if (type) updateType(type.name)
  }

  const onEntrySelect = selectedEntryIdx => {
    setSelectedEntryIdx(selectedEntryIdx)
  }

  const removeInitialSelectedReleaseID = () => {
    setInitialSelectedReleaseID(null)
  }

  return (
    <div className="main-content">
      <NavBar
        artists={artists}
        selectedArtist={selectedArtist}
        onSelectArtist={onSelectArtist}
        types={types}
        selectedType={selectedType}
        onSelectType={onSelectType}
        entryFilterText={entryFilterText}
        onChangeEntryFilterText={onChangeEntryFilterText}
        showEntriesFilter={entries.length > 1}
        artistsSelector={artistsSelector}
        typesSelector={typesSelector}
        filterInput={filterInput}
      />
      <main>
        {errorText &&
          <section className="main-error-text">
            {errorText}
          </section>
        }
        {infoText &&
          <section className="main-info-text">
            {infoText}
          </section>
        }
        <Entries
          ref={entriesSection}
          entryFilterText={entryFilterText}
          entries={entries}
          onEntrySelect={onEntrySelect}
          selectedEntryIdx={selectedEntryIdx}
          initialSelectedReleaseID={initialSelectedReleaseID}
          removeInitialSelectedReleaseID={removeInitialSelectedReleaseID}
        />
      </main>
    </div>
  )
}
