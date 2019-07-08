import React, { useState } from 'react'

// const Selector = ({ choices, onChange, selectedIdx }) => (
//   <select
//     value={selectedIdx}
//     onChange={e => onChange(e.target.value)}
//     className="app-header__select-box"
//     disabled={choices.length === 1}
//   >
//     {choices.map((c, idx) => (
//       <option key={c.id} value={idx}>
//         {c.name}
//       </option>
//     ))}
//   </select>
// )

const Selector = ({ items, selectedItem, onSelect }) => {
  const [filteredItems, setFilteredItems] = useState(items)
  const [showList, setShowList] = useState(false)
  const [inputValue, setInputValue] = useState(selectedItem.name)

  const onChange = e => {
    const { value } = e.target
    setInputValue(value)
    setFilteredItems(items.filter(i => i.name.toLowerCase().includes(value.trim().toLowerCase())))
  }

  return (
    <div className="selector-wrapper">
      <input
        className="selector-input"
        type="text"
        value={inputValue}
        onFocus={() => setShowList(true)}
        onBlur={() => setShowList(true)}
        onChange={onChange}
      />
      {showList &&
        <ul
          className="selector-list"
          onMouseLeave={() => setShowList(false)}
        >
          {filteredItems.map(i => (
            <li
              key={i.id}
              onClick={() => {
                setShowList(false)
                setInputValue(i.name)
                onSelect(i)
              }}
            >
            {i.name}
          </li>
          ))}
      </ul>
      }
    </div>
  )

}

const NavBar = ({ artists, selectedArtist, onSelectArtist, types, selectedTypeIdx, onSelectType, entries, entryFilterText, onChangeEntryFilterText }) => {
  return (
    <header className="app-header">
      <h1 className="app-header__title">Queen Collection</h1>
      <div className="app-header__selectors">
        {artists &&
          <Selector
            items={artists}
            selectedItem={selectedArtist}
            onSelect={onSelectArtist}
          />
        }
        {/* <Selector
          choices={artists}
          onChange={onSelectArtist}
          selectedIdx={selectedArtistIdx}
        /> */}
        {/* {types && <Selector
          choices={types}
          onChange={onSelectType}
          selectedIdx={selectedTypeIdx}
        />} */}
        {/* {entries && <input className="entries-filter" type="text" placeholder="Filter entries" value={entryFilterText} onChange={onChangeEntryFilterText}  />} */}
      </div>
    </header>
  )
}

export default NavBar
