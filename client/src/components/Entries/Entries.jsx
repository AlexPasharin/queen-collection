import React from 'react'

import Entry from './Entry'
import '../../styles/Entries.css'

const Entries = ({ entries, onSelectEntry }) => {
  if (!entries)
    return <div className="entry-list-empty">Loading data...</div>

  if (!entries.length)
    return <div className="entry-list-empty">No entries correspond to the search release</div>

  return (
    <ul>
      {entries.map(e =>
        <Entry key={e.id} entry={e} onSelectEntry={() => onSelectEntry(e)} />
      )}
    </ul>
  )
}

export default Entries
