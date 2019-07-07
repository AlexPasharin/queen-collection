import React, { useState } from 'react'

import EntryReleases from './EntryReleases'
import { formatDate } from '../utils/dataHelpers'

const Entry = ({ entry, onSelectEntry, onSelectRelease }) => {
  const [open, setOpen] = useState(false)

  const onSelect = () => {
    if (!open) {
      onSelectEntry()
    }

    setOpen(!open)
  }

  return (
    <li className={`entry-block${open ? " entry-block__open" : ""}`} key={entry.id}>
      <div className="entry-block__details" onClick={onSelect}>
        <h2>{entry.name} </h2>
        <p>
          <span className="detail__title">Original release date: </span>
          {formatDate(entry.release_date)}
      </p>
      </div>
      {open && <EntryReleases releases={entry.releases} onSelectRelease={onSelectRelease}/>}
    </li>
  )
}

export default Entry
