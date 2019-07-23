import React, { Component, createRef } from 'react'

import Entry from './Entry'
import '../../styles/Entries.css'

export default class Entries extends Component {
  state = {
    focusedEntryIdx: null,
  }

  el = createRef()
  focusedEl = createRef()

  get currentFocusedEl() {
    return this.focusedEl.current
  }

  onElementFocus = () => {
    if (this.state.focusedEntryIdx === null) {
      this.setState({
        focusedEntryIdx: 0,
        prevFocusedEntryIdx: undefined
      })
    }
  }

  onElementBlur = () => {
    this.setState(prevState => ({
      focusedEntryIdx: null,
      prevFocusedEntryIdx: prevState.focusedEntryIdx,
    }))
  }

  selectPrevRelease = () => {
    if (!this.currentFocusedEl) {
      return false
    }

    return this.currentFocusedEl.selectPrevRelease()
  }

  selectNextRelease = () => {
    if (!this.currentFocusedEl) {
      return false
    }

    return this.currentFocusedEl.selectNextRelease()
  }

  onKeyDown = e => {
    e.preventDefault()
    const { key } = e


    if (key === 'ArrowUp') {
      const releaseSelected = this.selectPrevRelease()

      if (!releaseSelected) {
        this.setState(prevState => {
          const { focusedEntryIdx } = prevState
          const newfocusedIdx = focusedEntryIdx === null ? 0 :
            focusedEntryIdx === 0 ? this.props.entries.length - 1 : focusedEntryIdx - 1

          return ({
            focusedEntryIdx: newfocusedIdx
          })
        })
      }
    } else if (key === 'ArrowDown') {
      const releaseSelected = this.selectNextRelease()

      if (!releaseSelected) {
        this.setState(prevState => {
          const { focusedEntryIdx } = prevState
          const newfocusedIdx = focusedEntryIdx === null ? 0 :
            focusedEntryIdx === this.props.entries.length - 1 ? 0 : focusedEntryIdx + 1

          return ({
            focusedEntryIdx: newfocusedIdx
          })
        })
      }
    } else if (key === "Enter") {
      this.currentFocusedEl && this.currentFocusedEl.handleEnterKeyPress()
    }
  }

  afterReleaseDetailsModalClose = () => {
    this.setState(
      prevState => ({
        focusedEntryIdx: prevState.focusedEntryIdx === null ?
          prevState.prevFocusedEntryIdx : prevState.focusedEntryIdx
      }),
      () => this.el.current.focus()
    )
  }

  onEntryClick = idx => {
    this.setState({ focusedEntryIdx: idx })
  }

  render() {
    const { entries, artist, type } = this.props
    const { focusedEntryIdx } = this.state

    if (!entries)
      return <div className="entry-list-empty">Loading data...</div>

    if (!entries.length)
      return <div className="entry-list-empty">No entries correspond to the search release</div>

    return (
      <ul
        tabIndex="0"
        className={"entry-list"}
        ref={this.el}
        onKeyDown={this.onKeyDown}
        onFocus={this.onElementFocus}
        onBlur={this.onElementBlur}
      >
        {entries.map((e, idx) => {
          const isFocusedElement = focusedEntryIdx === idx

          return (
            <Entry
              key={e.id}
              ref={isFocusedElement ? this.focusedEl : null}
              focused={isFocusedElement}
              entry={e}
              onClick={() => this.onEntryClick(idx)}
              afterReleaseDetailsModalClose={this.afterReleaseDetailsModalClose}
              artistName={artist.name}
              typeName={type.name}
            />)
        })}
      </ul>
    )
  }
}
