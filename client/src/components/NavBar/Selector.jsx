import React, { Component, createRef } from 'react'

import { classList } from '../../utils/classList'

class Selector extends Component {
  state = ({
    showList: false,
    inputValue: this.props.selectedItem.name,
    filteredItems: this.props.items,
    selectedItemIdx: null,
    inputError: false
  })

  inputEl = createRef()
  itemList = createRef()

  setNewSelectedItemIdx = (idx, scrollIntoView = true) => {
    this.setState(prevState => ({
      selectedItemIdx: idx,
      inputValue: prevState.filteredItems[idx].name
    }), () => {
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
    const { selectedItem } = this.props

    if (!selectedItem || item.id !== selectedItem.id) {
      this.props.onSelect(item)
    }

    this.setState({
      showList: false,
      inputValue: item.name,
    })

    this.inputEl.current.blur()
  }

  onInputMouseEnter = () => {
    this.inputEl.current.focus()

    this.setState(prevState => {
      let { filteredItems, selectedItemIdx } = prevState

      if (!selectedItemIdx)
        selectedItemIdx = filteredItems.findIndex(
          i => i.name.includes(this.state.inputValue)
        )

      if (selectedItemIdx < 0)
        selectedItemIdx = 0

      return ({
        showList: true,
        selectedItemIdx: selectedItemIdx,
        filteredItems: filteredItems.length ? filteredItems : this.props.items,
        error: false,
      })
    }, this.scrollSelectedItemIntoView)
  }

  onKeyDown = e => {
    const { key } = e

    if (key === "Enter" || key === "Tab") {
      const { filteredItems, inputValue, selectedItemIdx } = this.state
      const itemIndex = selectedItemIdx !== null ? selectedItemIdx :
        filteredItems.length === 1 ? 0 :
          filteredItems.findIndex(i => i.name.toLowerCase() === inputValue.trim().toLowerCase())

      const item = filteredItems[itemIndex]

      if (item) {
        this.onSelect(item)
      } else {
        e.preventDefault()
        this.setState({ error: true })
      }
    } else if (key === 'ArrowUp' && !this.state.error) {
      const { selectedItemIdx, filteredItems } = this.state
      const newSelectedItemIdx = selectedItemIdx === null ? 0 :
        selectedItemIdx === 0 ? filteredItems.length - 1 : selectedItemIdx - 1

      this.setNewSelectedItemIdx(newSelectedItemIdx)
    } else if (key === 'ArrowDown' && !this.state.error) {
      const { selectedItemIdx, filteredItems } = this.state
      const newSelectedItemIdx = selectedItemIdx === null ? 0 :
        selectedItemIdx === filteredItems.length - 1 ? 0 : selectedItemIdx + 1

      this.setNewSelectedItemIdx(newSelectedItemIdx)
    }
  }

  scrollSelectedItemIntoView = () => {
    if (this.itemList.current) {
      const selectedItemElement = this.itemList.current.querySelector(".selector-list__element--selected")
      selectedItemElement && selectedItemElement.scrollIntoView(true)
    }
  }

  onSelectorLeave = () => {
    this.setState({ showList: false })

    if (this.state.error) {
      this.props.onSelect(null)
    } else {
      const selectedItem = this.state.filteredItems[this.state.selectedItemIdx]
      if (selectedItem) {
        this.props.onSelect(selectedItem)
      }
    }
  }

  onFocus = () => {
    this.setState({ showList: true })
  }

  render() {
    const { showList, inputValue, filteredItems, selectedItemIdx, error } = this.state
    const onlyOneItem = this.props.items.length === 1

    const selectedItem = filteredItems[selectedItemIdx]

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
          value={selectedItem ? selectedItem.name : inputValue}
          onFocus={this.onFocus}
          onKeyDown={this.onKeyDown}
          onChange={this.onChange}
          onMouseEnter={this.onInputMouseEnter}
          disabled={onlyOneItem}
        />
        {
          showList && !onlyOneItem &&
          <ul
            ref={this.itemList}
            className="selector-list"
          >
            {filteredItems.map((i, idx) => (
              <li
                key={i.id}
                className={classList("selector-list__element", {
                  selected: selectedItemIdx === idx
                })}
                onClick={() => this.onSelect(i)}
                onMouseEnter={() => this.setNewSelectedItemIdx(idx, false)}
              >
                {i.name}
              </li>
            ))}
          </ul>
        }
      </div >
    )
  }
}

export default Selector
