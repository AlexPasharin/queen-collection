import React, { Component, createRef } from 'react'

import Entry from './Entry'
import '../../styles/Entries.css'

export default class Entries extends Component {
  state = {
    focusedEntry: null
  }

  el = createRef()

  get focusedEntryIdx() {
    const { entries } = this.props
    const { focusedEntry } = this.state

    if (!focusedEntry) return null

    const index = entries.findIndex(e => e.id === focusedEntry.id)

    return index >= 0 ? index : null
  }

  focusNewEntry = idx => {
    this.setState({
      focusedEntry: this.props.entries[idx] || null
    })
  }

  onKeyDown = e => {
    if (document.activeElement !== this.el.current)
      return

    const { key } = e

    if (key === 'ArrowUp') {
      const oldIdx = this.focusedEntryIdx
      const newfocusedIdx = oldIdx === null ? 0 :
        oldIdx === 0 ? this.props.entries.length - 1 : oldIdx - 1

      this.focusNewEntry(newfocusedIdx)
    } else if (key === 'ArrowDown') {
      const oldIdx = this.focusedEntryIdx
      const newfocusedIdx = oldIdx === null ? 0 :
        oldIdx === this.props.entries.length - 1 ? 0 : oldIdx + 1

      this.focusNewEntry(newfocusedIdx)
    }
  }

  render() {
    const { entries, onSelectEntry } = this.props
    if (!entries)
      return <div className="entry-list-empty">Loading data...</div>

    if (!entries.length)
      return <div className="entry-list-empty">No entries correspond to the search release</div>

    const { focusedEntry } = this.state

    return (
      <ul tabIndex="0" ref={this.el} onKeyDown={this.onKeyDown}>
        {entries.map(e =>
          <Entry key={e.id} focused={focusedEntry && focusedEntry.id === e.id} entry={e} onSelectEntry={() => onSelectEntry(e)} />
        )}
      </ul>
    )
  }
}
