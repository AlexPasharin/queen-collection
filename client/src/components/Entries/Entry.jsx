import React, { Component, createRef } from 'react'

import { formatDate } from '../../utils/dataHelpers'
import { classList } from '../../utils/classList'

import EntryReleases from './EntryReleases'

export default class Entry extends Component {
  state = {
    open: false
  }

  el = createRef()

  componentDidUpdate(prevProps) {
    if (!prevProps.selected && this.props.selected) {
      this.el.current.focus()
    }
  }

  onKeyDown = e => {
    e.preventDefault()

    const { key } = e

    if (key === 'ArrowUp') {
      this.props.selectPrevEntry()
    } else if (key === 'ArrowDown') {
      this.props.selectNextEntry()
    } else if (key === "Tab") {
      if (this.props.lastEntry) {
        this.el.current.blur()
      } else {
        this.props.selectNextEntry()
      }
    } else if (key === "Enter") {
      this.toggleReleasesBlock()
    }
  }

  toggleReleasesBlock = () => {
    this.setState(
      prevState => ({ open: !prevState.open }),
      () => {
        if (!this.state.open) {
          this.reFocus()
        }
      }
    )
  }

  reFocus = () => {
    if (this.props.selected) {
      this.el.current.focus()
    }
  }

  onMouseDown = e => {
    e.preventDefault()
  }

  onClick = () => {
    if (!this.props.selected)
      this.props.select()

    this.setState(
      prevState => ({ open: !prevState.open }),
    )
  }

  onFocus = () => {
    if (!this.props.selected)
      this.props.select()
  }

  render() {
    const { entry, artistName, typeName, selected } = this.props
    const { open } = this.state
    const { name, release_date, id } = entry

    return (
      <li
        tabIndex="0"
        ref={this.el}
        className={classList("entry-block", { open, selected }, ["no-focus-outline"])}
        onKeyDown={this.onKeyDown}
        onFocus={this.onFocus}
        onMouseDown={this.onMouseDown}
      >
        <div className="entry-block__details" onClick={this.onClick}>
          <h2>{name} </h2>
          <p>
            <span className="detail__title">Original release date: </span>
            {formatDate(release_date)}
          </p>
        </div>
        {open &&
          <EntryReleases
            entryID={id}
            artistName={artistName}
            entryName={entry.name}
            typeName={typeName}
            close={this.toggleReleasesBlock}
            afterReleaseDetailsModalClose={this.reFocus}
          />
        }
      </li>
    )
  }
}
