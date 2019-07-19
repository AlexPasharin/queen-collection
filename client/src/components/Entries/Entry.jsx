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

  get offsetTop() {
    return this.el.current.offsetTop;
  }

  get isOpen() {
    return this.state.open
  }

  get hasSelectedRelease() {
    return this.releasesElement.hasSelectedRelease
  }

  get releasesElement() {
    return this.releasesEl.current
  }

  selectPrevRelease = () => {
    this.releasesElement.selectPrevRelease()
  }

  selectNextRelease = () => {
    this.releasesElement.selectNextRelease()
  }

  handleEnterKeyPress = () => {
    if (this.state.open && this.releasesElement.hasSelectedRelease) {
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
    const { entry, focused, afterReleaseDetailsModalClose } = this.props
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
            entryID={id}
            ref={this.releasesEl}
            afterReleaseDetailsModalClose={afterReleaseDetailsModalClose}
          />
        }
      </li>
    )
  }
}
