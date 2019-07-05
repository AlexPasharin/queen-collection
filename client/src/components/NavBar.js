import React from 'react'

const Selector = ({ choices, onChange, selected }) => (
  choices &&
  <select
    value={selected || ""}
    onChange={onChange}
    className="app-header__select-box"
    disabled={choices.length === 1}
  >
    {choices.map(c => (
      <option key={c.id} value={c.id.toString()}>
        {c.name}
      </option>
    ))}
  </select>
)

const NavBar = ({ artists, selectedArtistID, onSelectArtist, types, selectedTypeID, onSelectType, entryFilterText, onChangeEntryFilterText }) => (
  <header className="app-header">
    <h1 className="app-header__title">Queen Collection</h1>
    <div className="app-header__selectors">
      <Selector
        choices={artists}
        onChange={onSelectArtist}
        selected={selectedArtistID}
      />
      <Selector
        choices={types}
        onChange={onSelectType}
        selected={selectedTypeID}
      />
      <input className="entries-filter" type="text" placeholder="Filter entries" value={entryFilterText} onChange={onChangeEntryFilterText}  />
    </div>
  </header>
)

export default NavBar
