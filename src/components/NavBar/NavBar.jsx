import React from 'react'

import Selector from './Selector'
import '../../styles/NavBar.css'

const NavBar = ({ artists, selectedArtist, onSelectArtist, types, selectedType, onSelectType, showEntriesFilter, entryFilterText, onChangeEntryFilterText, artistsSelector, typesSelector }) => (
  <header className="app-header">
    <h1 className="app-header__title">Queen Collection</h1>
    <div className="app-header__selectors" >
      <Selector
        ref={artistsSelector}
        items={artists}
        selectedItem={selectedArtist}
        onSelect={onSelectArtist}
        placeholder="Select an artist"
      />
      <Selector
        ref={typesSelector}
        items={types}
        selectedItem={selectedType}
        onSelect={onSelectType}
      />
      {showEntriesFilter &&
        <input
          className="entries-filter"
          type="text"
          placeholder="Filter entries"
          value={entryFilterText}
          onChange={e => onChangeEntryFilterText(e.target.value)}
        />
      }
    </div>
  </header>
)

export default NavBar
