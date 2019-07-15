import React, { useEffect, useRef, useState } from 'react'

import EntryReleases from './EntryReleases'
import { formatDate } from '../../utils/dataHelpers'
import { classList } from '../../utils/classList'

const Entry = ({ entry, onSelectEntry, focused }) => {
  // const el = useRef()
  const [open, setOpen] = useState(false)

  // useEffect(() => {
  //   if (focused && el.current) {
  //     el.current.scrollIntoView(true)
  //   }
  // }, [focused])

  const onSelect = () => {
    if (!open) {
      onSelectEntry()
    }

    setOpen(!open)
  }

  return (
    <li
      // ref={el}
      className={classList("entry-block", {
        open, focused
      })}
    // tabIndex="0"
    // onFocus={() => setFocused(true)}
    // onBlur={() => setFocused(false)}
    // onKeyDown={onKeyDown}
    >
      <div className="entry-block__details" onClick={onSelect}>
        <h2>{entry.name} </h2>
        <p>
          <span className="detail__title">Original release date: </span>
          {formatDate(entry.release_date)}
        </p>
      </div>
      {open && <EntryReleases releases={entry.releases} />}
    </li>
  )
}

export default Entry
