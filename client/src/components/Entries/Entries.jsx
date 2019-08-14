import React from 'react'

import Entry from './Entry'
import '../../styles/Entries.css'

const prevIndex = (arr, index) =>
  index === null ? 0 :
    index === 0 ? arr.length - 1 : index - 1

const nextIndex = (arr, index) =>
  index === null ? 0 :
    index === arr.length ? 0 : index + 1

const Entries = ({ entries, selectedEntryIdx, onEntrySelect, initialSelectedReleaseID, removeInitialSelectedReleaseID }) => {
  if (!entries)
    return <div className="entry-list-empty">Loading data...</div>

  if (!entries.length)
    return <div className="entry-list-empty">No entries correspond to the search release</div>

  const selectPrevEntry = () => onEntrySelect(prevIndex(entries, selectedEntryIdx))
  const selectNextEntry = () => onEntrySelect(nextIndex(entries, selectedEntryIdx))

  return (
    <ul>
      {entries.map((e, idx) =>
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
        />)
      }
    </ul>
  )
}

export default Entries
