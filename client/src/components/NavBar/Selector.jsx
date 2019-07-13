import React, { Component, createRef } from 'react'

class Selector extends Component {
  state = ({
    showList: false,
    inputValue: this.props.selectedItem.name,
    filteredItems: this.props.items
  })

  inputEl = createRef()

  onChange = e => {
    const { value } = e.target
    this.setState({
      showList: true,
      inputValue: value,
      filteredItems: this.state.items.filter(i => i.name.toLowerCase().includes(value.trim().toLowerCase()))
    })
  }

  onSelect = item => {
    if (item.id !== this.props.selectedItem.id) {
      this.props.onSelect(item)
    }

    this.setState({
      showList: false,
      inputValue: item.name,
    })

    this.inputEl.current.blur()
  }

  onInputMouseEnter = () => {
    this.setState({ showList: true })
    this.inputEl.current.focus()
  }

  onKeyDown = e => {
    const { key } = e

    if (key === "Enter" || key === "Tab") {
      const { filteredItems, inputValue } = this.state
      const item = filteredItems.length === 1 ? filteredItems[0] : filteredItems.find(i => i.name.toLowerCase() === inputValue.trim().toLowerCase())

      if (item) {
        this.onSelect(item)
      } else {
        e.preventDefault()
      }
    }
  }

  onSelectorLeave = () => {
    this.setState({ showList: false })
  }

  onFocus = () => {
    this.setState({ showList: true })
  }

  render() {
    const { showList, inputValue, filteredItems } = this.state
    const onlyOneItem = this.props.items.length === 1

    return (
      <div
        className="selector-wrapper"
        onMouseLeave={this.onSelectorLeave}
      >
        <input
          className="selector-input"
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
            {filteredItems.map(i => (
              <li
                key={i.id}
                onClick={() => this.onSelect(i)}
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
