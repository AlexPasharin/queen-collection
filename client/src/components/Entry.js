import React, { useState } from 'react'
import EntryReleases from './EntryReleases'

const Entry = ({ entry, onSelectEntry }) => {
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
          {entry.release_date ? entry.release_date : 'unknown'}
      </p>
      </div>
      {open && <EntryReleases releases={entry.releases}/>}
    </li>
  )
}

export default Entry
