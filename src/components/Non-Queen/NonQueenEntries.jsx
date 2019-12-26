import React, { useEffect, useState } from 'react'

import { getNonQueenEntries } from "../../utils/dataGetters"

import '../../styles/NonQueenEntries.css'

const NonQueenEntries = () => {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchKey, setSearchKey] = useState("")

  useEffect(() => {
    getNonQueenEntries().then(entries => {
      setEntries(entries)
      setLoading(false)
    })
  })

  if (loading)
    return "Loading entries..."

  const onSearch = e => {
    setSearchKey(e.target.value.toLowerCase())
  }

  const filteredEntries = searchKey ?
    entries.filter(
      e =>
        e.artist_name.toLowerCase().includes(searchKey) || e.name.toLowerCase().includes(searchKey)
    )
    : entries

  return (
    <>
      <div className="non-queen-filter">
        <span className="non-queen-filter-text">Filter:</span>
        <input
          value={searchKey}
          onChange={onSearch}
        />
      </div>
      <ul className="non-queen-entries">
        {filteredEntries.map(e => (
          <li key={e.id}>
            <h2>{e.artist_name} - {e.name}</h2>
            <div>Format: {e.format}</div>
            <a href={e.discogs_url}>{e.discogs_url}</a>
          </li>
        ))}
      </ul>
    </>
  )
}

export default NonQueenEntries
