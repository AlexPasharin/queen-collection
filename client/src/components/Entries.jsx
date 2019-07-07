import React from 'react'

import Entry from './Entry'

const Entries = ({ entries, onSelectEntry, entryFilterText, onSelectRelease }) => {
  if (!entries)
    return <div className="entry-list-empty">Loading data...</div>

  const filteredEntries = entryFilterText ?
    entries.filter(e => e.name.toLowerCase().includes(entryFilterText.toLowerCase().trim())) :
    entries

  if (!filteredEntries.length)
    return <div className="entry-list-empty">No entries correspond to the search release</div>

  return (
    <ul>
      {filteredEntries.map(e =>
        <Entry key={e.id} entry={e} entryFilterText={entryFilterText} onSelectEntry={() => onSelectEntry(e)} onSelectRelease={onSelectRelease}/>
      )}
    </ul>
  )
}

export default Entries
