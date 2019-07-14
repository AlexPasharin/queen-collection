import React from 'react'

import Selector from './Selector'
import '../../styles/NavBar.css'

const NavBar = ({ artists, selectedArtist, onSelectArtist, types, selectedType, onSelectType, entries, entryFilterText, onChangeEntryFilterText }) => {
  return (
    <header className="app-header">
      <h1 className="app-header__title">Queen Collection</h1>
      <div className="app-header__selectors" >
        {artists &&
          <Selector
            items={artists}
            selectedItem={selectedArtist}
            onSelect={onSelectArtist}
          />
        }
        {types &&
          <Selector
            key={selectedArtist ? selectedArtist.id : 0}
            items={types}
            selectedItem={selectedType}
            onSelect={onSelectType}
            name="types"
          />
        }
        {entries &&
          <input className="entries-filter" type="text" placeholder="Filter entries" value={entryFilterText} onChange={onChangeEntryFilterText} />
        }
      </div>
    </header>
  )
}

export default NavBar
