import React, { Component, createRef } from 'react'

class Selector extends Component {
  static getDerivedStateFromProps(props, state) {
    if (!state || (state.items !== props.items))
      return {
        showList: false,
        inputValue: props.selectedItem.name,
        items: props.items,
        filteredItems: props.items
      }

    return null
  }

  inputEl = createRef()

  onChange = e => {
    const { value } = e.target
    this.setState({
      inputValue: value,
      filteredItems: this.state.items.filter(i => i.name.toLowerCase().includes(value.trim().toLowerCase()))
    })
  }

  onSelect = item => {
    this.setState({
      showList: false,
      inputValue: item.name,
    })

    this.props.onSelect(item)
  }

  onMouseEnter = () => {
    this.setState({ showList: true })
    this.inputEl.current.focus()
  }

  render() {
    const { showList, inputValue, filteredItems } = this.state

    return (
      <div
        className="selector-wrapper"
        onMouseLeave={() => this.setState({ showList: false })}
      >
        <input
          className="selector-input"
          type="text"
          ref={this.inputEl}
          value={inputValue}
          // onFocus={() => setShowList(true)}
          onChange={this.onChange}
          onMouseEnter={this.onMouseEnter}
        />
        {
          showList &&
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
