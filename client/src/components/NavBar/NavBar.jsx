import React from 'react'

import Selector from './Selector'
import '../../styles/NavBar.css'

const NavBar = ({ artists, selectedArtist, onSelectArtist, types, selectedType, onSelectType, showEntriesFilter, entryFilterText, onChangeEntryFilterText }) => (
  <header className="app-header">
    <h1 className="app-header__title">Queen Collection</h1>
    <div className="app-header__selectors" >
      <Selector
        items={artists}
        selectedItem={selectedArtist}
        onSelect={onSelectArtist}
      />
      <Selector
        items={types}
        selectedItem={selectedType}
        onSelect={onSelectType}
      />
      {showEntriesFilter &&
        <input className="entries-filter" type="text" placeholder="Filter entries" value={entryFilterText} onChange={onChangeEntryFilterText} />
      }
    </div>
  </header>
)

export default NavBar
