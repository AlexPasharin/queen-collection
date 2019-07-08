import React from 'react'

import Selector from './Selector'

const NavBar = ({ artists, selectedArtist, onSelectArtist, types, selectedType, onSelectType, entries, entryFilterText, onChangeEntryFilterText }) => {
  return (
    <header className="app-header">
      <h1 className="app-header__title">Queen Collection</h1>
      {artists &&
        <Selector
          items={artists}
          selectedItem={selectedArtist}
          onSelect={onSelectArtist}
        />
      }
      {types &&
        <Selector
          items={types}
          selectedItem={selectedType}
          onSelect={onSelectType}
        />
      }
      {/* {entries && <input className="entries-filter" type="text" placeholder="Filter entries" value={entryFilterText} onChange={onChangeEntryFilterText}  />} */}
    </header>
  )
}

export default NavBar
