import React, { Component, createRef } from 'react'

import { classList } from '../../utils/classList'

class Selector extends Component {
  static getDerivedStateFromProps(newProps, state) {
    if (newProps.selectedItem && newProps.selectedItem.id !== state.currentItemID) {
      return ({
        inputValue: newProps.selectedItem.name,
        currentItemID: newProps.selectedItem.id,
        error: false,
        showList: false,
        selectedItemIdx: null
      })
    }

    if (!newProps.selectedItem) {
      return ({
        currentItemID: null,
        error: true
      })
    }

    return null
  }

  state = ({
    inputValue: "",
    filteredItems: this.props.items
  })

  inputEl = createRef()
  selectedItemEl = createRef(null)

  setNewSelectedItemIdx = (idx, scrollIntoView = true) => {
    this.setState({ selectedItemIdx: idx }, () => {
      if (scrollIntoView) {
        this.scrollSelectedItemIntoView()
      }
    })
  }

  onChange = e => {
    const { value } = e.target
    const { items } = this.props
    const newFilteredItems = items.filter(i => i.name.toLowerCase().includes(value.trim().toLowerCase()))
    const noItems = newFilteredItems.length === 0

    this.setState({
      showList: true,
      inputValue: value,
      filteredItems: noItems ? items : newFilteredItems,
      selectedItemIdx: null,
      error: noItems
    })
  }

  onSelect = item => {
    const { currentItemID } = this.state

    // make a new selection request only if current selected item wouldnt change
    if (!currentItemID || item.id !== currentItemID) {
      this.props.onSelect(item)
    } else {
      this.setState({
        showList: false,
        selectedItemIdx: null
      })
    }

    this.inputEl.current.blur()
  }

  onInputMouseEnter = () => {
    this.inputEl.current.focus()
    this.setState({
      showList: true,
      selectedItemIdx: null
    })
  }

  get suitableItem() {
    const { filteredItems, inputValue, selectedItemIdx } = this.state
    const itemIndex = selectedItemIdx !== null ? selectedItemIdx :
      filteredItems.length === 1 ? 0 :
        filteredItems.findIndex(i => i.name.toLowerCase() === inputValue.trim().toLowerCase())

    return filteredItems[itemIndex]
  }

  onKeyDown = e => {
    const { key } = e

    if (key === "Enter") {
      const item = this.suitableItem;

      if (item) {
        this.onSelect(item)
      } else {
        e.preventDefault()
        this.setState({ error: true })
      }
    } else if (key === "Tab") {
      const item = this.suitableItem;

      if (item) {
        this.setState({ showList: false })
      } else {
        e.preventDefault()
        this.setState({ error: true })
      }
    } else if (key === 'ArrowUp') {
      const { selectedItemIdx, filteredItems } = this.state
      const newselectedItemIdx = selectedItemIdx === null ? 0 :
        selectedItemIdx === 0 ? filteredItems.length - 1 : selectedItemIdx - 1

      this.setNewSelectedItemIdx(newselectedItemIdx)
    } else if (key === 'ArrowDown') {
      const { selectedItemIdx, filteredItems } = this.state
      const newselectedItemIdx = selectedItemIdx === null ? 0 :
        selectedItemIdx === filteredItems.length - 1 ? 0 : selectedItemIdx + 1

      this.setNewSelectedItemIdx(newselectedItemIdx)
    }
  }

  scrollSelectedItemIntoView = () => {
    if (this.selectedItemEl.current) {
      this.selectedItemEl.current.scrollIntoView()
    }
  }

  onSelectorLeave = () => {
    this.setState({ showList: false })
    this.inputEl.current.blur()

    if (this.state.error) {
      this.props.onSelect(null)
    }
  }

  onFocus = () => {
    this.setState({ showList: true })
  }

  render() {
    const { showList, inputValue, filteredItems, selectedItemIdx, error } = this.state
    const onlyOneItem = this.props.items.length === 1

    return (
      <div
        className="selector-wrapper"
        onMouseLeave={this.onSelectorLeave}
      >
        <input
          className={classList("selector-input", {
            error
          })}
          type="text"
          ref={this.inputEl}
          value={inputValue}
          onFocus={this.onFocus}
          onKeyDown={this.onKeyDown}
          onChange={this.onChange}
          onMouseEnter={this.onInputMouseEnter}
          disabled={onlyOneItem}
        />
        {
          showList && !onlyOneItem &&
          <ul
            className="selector-list"
          >
            {filteredItems.map((i, idx) => {
              const isSelected = selectedItemIdx === idx

              return (
                <li
                  key={i.id}
                  ref={isSelected ? this.selectedItemEl : null}
                  className={classList("selector-list__element", {
                    selected: isSelected
                  })}
                  onClick={() => this.onSelect(i)}
                  onMouseEnter={() => this.setNewSelectedItemIdx(idx, false)}
                >
                  {i.name}
                </li>
              )
            })}
          </ul>
        }
      </div >
    )
  }
}

export default Selector
