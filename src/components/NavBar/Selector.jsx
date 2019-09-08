import React, { useEffect, useState, useRef } from 'react'

import { classList } from '../../utils/classList'
import SelectorItem from './SelectorItem'

const initialState = (items, selectedItem) => ({
  inputValue: selectedItem ? selectedItem.name : "",
  filteredItems: items,
  error: false,
  showList: false,
  selectedItemIdx: null
})

const Selector = props => {
  const { items, selectedItem, onSelect } = props
  const [state, setState] = useState(initialState(items, selectedItem))

  const inputEl = useRef()
  const selectedItemEl = useRef(null)

  useEffect(() => {
    setState(initialState(items, selectedItem))

    if (selectedItemEl.current) {
      selectedItemEl.current.blur()
    }
  }, [selectedItem, items])


  const setNewSelectedItemIdx = (idx, scrollIntoView = true) => {
    setState(prevState => ({
      ...prevState,
      selectedItemIdx: idx
    }))

    if (scrollIntoView && selectedItemEl.current) {
      selectedItemEl.current.scrollIntoView()
    }
  }

  const onChange = e => {
    const { value } = e.target
    const newFilteredItems = items.filter(i => i.name.toLowerCase().includes(value.trim().toLowerCase()))
    const noItems = newFilteredItems.length === 0

    setState({
      showList: true,
      inputValue: value,
      filteredItems: noItems ? items : newFilteredItems,
      selectedItemIdx: null,
      error: noItems
    })
  }

  const onInputMouseEnter = () => {
    inputEl.current.focus()
    setState(prevState => ({
      ...prevState,
      showList: true,
      selectedItemIdx: null
    }))
  }

  const getSuitableItem = () => {
    const { filteredItems, inputValue, selectedItemIdx } = state
    const itemIndex = selectedItemIdx !== null ? selectedItemIdx :
      filteredItems.length === 1 ? 0 :
        filteredItems.findIndex(i => i.name.toLowerCase() === inputValue.trim().toLowerCase())

    return filteredItems[itemIndex]
  }

  const onKeyDown = e => {
    const { key } = e

    if (key === "Enter") {
      const item = getSuitableItem()

      if (item) {
        onSelect(item)
      } else {
        e.preventDefault()

        setState(prevState => ({
          ...prevState,
          error: true
        }))
      }
    } else if (key === "Tab") {
      const item = getSuitableItem()

      if (item) {
        setState(prevState => ({
          ...prevState,
          showList: false
        }))
      } else {
        e.preventDefault()

        setState(prevState => ({
          ...prevState,
          error: true
        }))
      }
    } else if (key === 'ArrowUp') {
      const { selectedItemIdx, filteredItems } = state
      const newSelectedItemIdx = selectedItemIdx === null ? 0 :
        selectedItemIdx === 0 ? filteredItems.length - 1 : selectedItemIdx - 1

      setNewSelectedItemIdx(newSelectedItemIdx)
    } else if (key === 'ArrowDown') {
      const { selectedItemIdx, filteredItems } = state
      const newSelectedItemIdx = selectedItemIdx === null ? 0 :
        selectedItemIdx === filteredItems.length - 1 ? 0 : selectedItemIdx + 1

      setNewSelectedItemIdx(newSelectedItemIdx)
    }
  }

  const onSelectorLeave = () => {
    setState(prevState => ({
      ...prevState,
      showList: false
    }))

    inputEl.current.blur()

    if (state.error) {
      onSelect(null)
    }
  }

  const onFocus = () => {
    setState(prevState => ({
      ...prevState,
      showList: true
    }))
  }

  const { showList, inputValue, filteredItems, selectedItemIdx, error } = state
  const oneOrZeroItems = items.length < 2

  return (
    <div
      className="selector-wrapper"
      onMouseLeave={onSelectorLeave}
    >
      <input
        className={classList("selector-input", {
          error
        })}
        type="text"
        ref={inputEl}
        value={inputValue}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onChange={onChange}
        onMouseEnter={onInputMouseEnter}
        disabled={oneOrZeroItems}
      />
      {
        showList && !oneOrZeroItems &&
        <ul
          className="selector-list"
        >
          {filteredItems.map((i, idx) => {
            const isSelected = selectedItemIdx === idx

            return (
              <SelectorItem
                key={i.id}
                ref={isSelected ? selectedItemEl : null}
                name={i.name}
                selected={isSelected}
                onClick={() => onSelect(i)}
                onMouseEnter={() => setNewSelectedItemIdx(idx, false)}
              />
            )
          })}
        </ul>
      }
    </div >
  )
}

export default Selector
