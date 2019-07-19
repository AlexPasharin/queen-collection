import React, { Component, createRef } from 'react'

import Entry from './Entry'
import '../../styles/Entries.css'

export default class Entries extends Component {
  state = {
    focusedEntryIdx: null,
  }

  el = createRef()
  focusedEl = createRef()

  componentDidUpdate() {
    if (this.scrollOnUpdate) {
      if (this.currentFocusedEl) {
        window.scrollTo(0, this.currentFocusedEl.offsetTop - this.el.current.offsetTop)
      }

      this.scrollOnUpdate = undefined
    }
  }

  get currentFocusedEl() {
    return this.focusedEl.current
  }

  onElementFocus = () => {
    if (this.state.focusedEntryIdx === null) {
      this.setState({
        focusedEntryIdx: 0,
        prevFocusedEntryIdx: undefined
      },
        () => window.scrollTo(0, 0)
      )
    }
  }

  onElementBlur = () => {
    this.setState(prevState => ({
      focusedEntryIdx: null,
      prevFocusedEntryIdx: prevState.focusedEntryIdx,
    }))
  }

  onKeyDown = e => {
    e.preventDefault()
    const { key } = e

    if (key === 'ArrowUp') {
      if (this.currentFocusedEl && this.currentFocusedEl.isOpen) {
        this.currentFocusedEl.selectPrevRelease()
      } else {
        this.scrollOnUpdate = true

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
      if (this.currentFocusedEl && this.currentFocusedEl.isOpen) {
        this.currentFocusedEl.selectNextRelease()
      } else {
        this.scrollOnUpdate = true
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
      if (this.currentFocusedEl) {
        this.currentFocusedEl.handleEnterKeyPress()
      }
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

  render() {
    const { entries } = this.props
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
              onClick={() => this.setState({ focusedEntryIdx: idx, scroll: true })}
              afterReleaseDetailsModalClose={this.afterReleaseDetailsModalClose}
            />)
        })}
      </ul>
    )
  }
}
