import React from 'react'

const NavBar = ({ artists, selectedArtistID, onSelectArtist, types, onSelectType }) => (
  <header className="app-header">
    <h1 className="app-header__title">Queen Collection</h1>
    {artists &&
      <select
        value={selectedArtistID? selectedArtistID : ""}
        onChange={onSelectArtist}
        className="app-header__select-box"
      >
        {artists.map(a => (
          <option key={a.id} value={a.id.toString()}>
            {a.name}
          </option>
        ))}
      </select>
    }
    {types &&
      <select
        onChange={onSelectType}
        className="app-header__select-box"
        disabled={types.length === 1}
      >
        {types.length > 1 && <option key="empty" value="" />}
        {types.map(t => (
          <option key={t.id} value={t.id.toString()}>
            {t.name}
          </option>
        ))}
      </select>
    }
  </header>
)

export default NavBar
