import React, { useContext } from 'react'


import { authContext } from "../../context/AuthContext"
import Entry from './Entry'
import '../../styles/Entries.css'

const prevIndex = (arr, index) =>
  index === null ? 0 :
    index === 0 ? arr.length - 1 : index - 1

const nextIndex = (arr, index) =>
  index === null ? 0 :
    index === arr.length ? 0 : index + 1

const Entries = ({ entries, selectedEntryIdx, onEntrySelect, entryFilterText, initialSelectedReleaseID, removeInitialSelectedReleaseID }) => {
  const { authenticated } = useContext(authContext)

  const filteredEntries = entryFilterText ?
    entries.filter(e => e.name.toLowerCase().includes(entryFilterText.toLowerCase().trim())) :
    entries

  if (!filteredEntries.length) {
    return entryFilterText ?
      <div className="entry-list-empty">No entries correspond to the search release</div> : null
  }

  const selectPrevEntry = () => onEntrySelect(prevIndex(filteredEntries, selectedEntryIdx))
  const selectNextEntry = () => onEntrySelect(nextIndex(filteredEntries, selectedEntryIdx))

  return (
    <ul>
      {filteredEntries.map((e, idx) =>
        <Entry
          key={e.id}
          entry={e}
          selected={selectedEntryIdx === idx}
          select={() => onEntrySelect(idx)}
          selectPrevEntry={selectPrevEntry}
          selectNextEntry={selectNextEntry}
          lastEntry={idx === entries.length - 1}
          initialSelectedReleaseID={selectedEntryIdx === idx ? initialSelectedReleaseID : null}
          removeInitialSelectedReleaseID={removeInitialSelectedReleaseID}
          authenticated={authenticated}
        />)
      }
    </ul>
  )
}

export default Entries
