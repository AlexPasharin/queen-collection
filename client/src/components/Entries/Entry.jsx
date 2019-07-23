import React, { Component, createRef } from 'react'

import { formatDate } from '../../utils/dataHelpers'
import { classList } from '../../utils/classList'

import EntryReleases from './EntryReleases'

export default class Entry extends Component {
  state = {
    open: false
  }

  el = createRef()
  releasesEl = createRef()

  componentDidUpdate(prevProps) {
    if (!prevProps.focused && this.props.focused) {
      this.el.current.scrollIntoView(false)
    }
  }

  get releasesElement() {
    return this.releasesEl.current
  }

  get hasSelectedRelease() {
    return this.releasesElement && this.releasesElement.hasSelectedRelease
  }

  selectPrevRelease = () => {
    if (!this.releasesElement) {
      return false
    }

    this.releasesElement.selectPrevRelease()

    return true
  }

  selectNextRelease = () => {
    if (!this.releasesElement) {
      return false
    }

    this.releasesElement.selectNextRelease()

    return true
  }

  handleEnterKeyPress = () => {
    if (this.state.open && this.hasSelectedRelease) {
      this.releasesElement.toggleSelectedReleaseDetails()
    } else {
      this.toggleReleasesBlock()
    }
  }

  toggleReleasesBlock = () => {
    this.setState(
      prevState => ({ open: !prevState.open }),
      this.props.onClick()
    )
  }

  render() {
    const { entry, artistName, typeName, focused, afterReleaseDetailsModalClose } = this.props
    const { open } = this.state
    const { name, release_date, id } = entry

    return (
      <li
        ref={this.el}
        className={classList("entry-block", { open, focused })}
      >
        <div className="entry-block__details" onClick={this.toggleReleasesBlock}>
          <h2>{name} </h2>
          <p>
            <span className="detail__title">Original release date: </span>
            {formatDate(release_date)}
          </p>
        </div>
        {open &&
          <EntryReleases
            key={id}
            entryID={id}
            artistName={artistName}
            entryName={entry.name}
            typeName={typeName}
            ref={this.releasesEl}
            afterReleaseDetailsModalClose={afterReleaseDetailsModalClose}
          />
        }
      </li>
    )
  }
}
