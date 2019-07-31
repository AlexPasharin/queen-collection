import React from 'react'

import Entry from './Entry'
import '../../styles/Entries.css'

const Entries = ({ entries, artist, type, selectPrevEntry, selectNextEntry, selectedEntryIdx, onEntrySelect, initialSelectedReleaseID, removeInitialSelectedReleaseID }) => {
  if (!entries)
    return <div className="entry-list-empty">Loading data...</div>

  if (!entries.length)
    return <div className="entry-list-empty">No entries correspond to the search release</div>

  return (
    <ul>
      {entries.map((e, idx) =>
        <Entry
          key={e.id}
          entry={e}
          selected={selectedEntryIdx === idx}
          select={() => onEntrySelect(idx)}
          artistName={artist.name}
          typeName={type.name}
          selectPrevEntry={selectPrevEntry}
          selectNextEntry={selectNextEntry}
          lastEntry={idx === entries.length - 1}
          initialSelectedReleaseID={selectedEntryIdx === idx ? initialSelectedReleaseID : null}
          initialSelectedReleaseID={initialSelectedReleaseID}
          removeInitialSelectedReleaseID={removeInitialSelectedReleaseID}
        />)
      }
    </ul>
  )
}

export default Entries
