import React from 'react'

const Selector = ({ choices, onChange, selectedIdx }) => (
  choices &&
  <select
    value={selectedIdx}
    onChange={e => onChange(e.target.value)}
    className="app-header__select-box"
    disabled={choices.length === 1}
  >
    {choices.map((c, idx) => (
      <option key={c.id} value={idx}>
        {c.name}
      </option>
    ))}
  </select>
)

const NavBar = ({ artists, selectedArtistIdx, onSelectArtist, types, selectedTypeIdx, onSelectType, entryFilterText, onChangeEntryFilterText }) => (
  types && <header className="app-header">
    <h1 className="app-header__title">Queen Collection</h1>
    <div className="app-header__selectors">
      <Selector
        choices={artists}
        onChange={onSelectArtist}
        selectedIdx={selectedArtistIdx}
      />
      <Selector
        choices={types}
        onChange={onSelectType}
        selectedIdx={selectedTypeIdx}
      />
      <input className="entries-filter" type="text" placeholder="Filter entries" value={entryFilterText} onChange={onChangeEntryFilterText}  />
    </div>
  </header>
)

export default NavBar
