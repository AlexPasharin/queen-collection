import React, { useEffect, useState } from 'react'

import NavBar from '../NavBar/NavBar'
import Entries from './Entries'

const EntriesMain = ({
  artists,
  types,
  entries,
  selectedArtist,
  selectedType,
  errorText,
  infoText,
  artistsSelector,
  typesSelector,
  filterInput,
  updateArtist,
  updateType
}) => {
  const [entryFilterText, setEntryFilterText] = useState("")
  const [selectedEntryIdx, setSelectedEntryIdx] = useState(null)
  const [initialSelectedReleaseID, setInitialSelectedReleaseID] = useState(null)

  const onChangeEntryFilterText = value => {
    setEntryFilterText(value)
    setSelectedEntryIdx(null)
  }

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

export default EntriesMain
