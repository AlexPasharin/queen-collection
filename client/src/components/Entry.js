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
    <li className={`entry-block${open ? " entry-block__open" : ""}`} key={entry.id} onClick={onSelect}>
      <h2>{entry.name} </h2>
      <p>Original release date: {entry.release_date ? entry.release_date : 'unknown'}</p>
      {open && <EntryReleases releases={entry.releases}/>}
    </li>
  )
}

export default Entry
