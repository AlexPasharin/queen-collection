import React, { Component, createRef } from 'react'

import { formatDate } from '../../utils/dataHelpers'
import { classList } from '../../utils/classList'
import { getReleases } from '../../utils/dataGetters'

import ReleaseDetailsModal from '../Modals/ReleaseDetailsModal'

import EntryReleases from './EntryReleases'

export default class Entry extends Component {
  state = {
    open: false,
    releases: null,
    selectedReleaseIdx: null,
    releaseModalOpen: false
  }

  el = createRef()

  componentDidMount() {
    if (this.props.selected) {
      this.el.current.focus()
      this.setState({ open: true })
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (!prevProps.selected && this.props.selected) {
      this.el.current.focus()
    }

    if (!prevState.open && this.state.open) {
      this.setState(
        { releases: await getReleases(this.props.entry.id) },
        () => {
          this.el.current.scrollIntoView()
          if (this.state.releases && this.props.initialSelectedReleaseID !== null) {
            const selectedReleaseIdx = this.state.releases.findIndex(r => r.id === this.props.initialSelectedReleaseID)

            this.selectRelease(selectedReleaseIdx)
            this.props.removeInitialSelectedReleaseID()
          }
        }
      )
    }

    if (prevState.open && !this.state.open) {
      this.setState({ releases: null })
    }
  }

  get selectedRelease() {
    const { selectedReleaseIdx, releases } = this.state
    const { artistName, entry, typeName } = this.props

    return selectedReleaseIdx === null ?
      null :
      ({
        ...releases[selectedReleaseIdx],
        artistName,
        entryName: entry.name,
        typeName
      })
  }

  selectPrevRelease = () => {
    this.setState(prevState => {
      const { selectedReleaseIdx, releases } = prevState
      const newSelectedReleaseIdx = selectedReleaseIdx === null ? releases.length - 1 :
        selectedReleaseIdx === 0 ? null : selectedReleaseIdx - 1

      return { selectedReleaseIdx: newSelectedReleaseIdx }
    })
  }

  selectNextRelease = () => {
    this.setState(prevState => {
      const { selectedReleaseIdx, releases } = prevState
      const newSelectedReleaseIdx = selectedReleaseIdx === null ? 0 :
        selectedReleaseIdx === releases.length - 1 ? null : selectedReleaseIdx + 1

      return { selectedReleaseIdx: newSelectedReleaseIdx }
    })
  }

  toggleReleasesBlock = () => {
    this.setState(
      prevState => ({ open: !prevState.open })
    )
  }

  selectRelease = idx => {
    this.setState({
      selectedReleaseIdx: idx,
      releaseModalOpen: true
    })
  }

  onKeyDown = e => {
    e.preventDefault()

    const { key } = e

    if (key === 'ArrowUp') {
      if (this.state.open) {
        this.selectPrevRelease()
      } else {
        this.props.selectPrevEntry()
      }
    } else if (key === 'ArrowDown') {
      if (this.state.open) {
        this.selectNextRelease()
      } else {
        this.props.selectNextEntry()
      }
    } else if (key === "Tab") {
      if (this.state.open) {
        this.selectNextRelease()
      } else if (this.props.lastEntry) {
        this.el.current.blur()
      } else {
        this.props.selectNextEntry()
      }
    } else if (key === "Enter") {
      if (this.state.selectedReleaseIdx !== null && !this.state.releaseModalOpen) {
        this.setState({ releaseModalOpen: true })
      } else if (this.state.releaseModalOpen) {
        this.setState({ releaseModalOpen: false })
      } else {
        this.toggleReleasesBlock()
      }
    }
  }

  onModalClose = () => {
    this.setState({ releaseModalOpen: false })
    this.el.current.focus()
  }

  onFocus = () => {
    if (!this.props.selected)
      this.props.select()
  }

  render() {
    const { entry, selected, selectedReleaseID } = this.props
    const { open, selectedReleaseIdx, releases, releaseModalOpen } = this.state
    const { name, release_date, id } = entry

    return (
      <li
        tabIndex="0"
        ref={this.el}
        className={classList("entry-block", { open, selected }, ["no-focus-outline"])}
        onKeyDown={this.onKeyDown}
        onFocus={this.onFocus}
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
            releases={releases}
            selectedReleaseIdx={selectedReleaseIdx}
            onSelectRelease={this.selectRelease}
            selectedReleaseID={selectedReleaseID}
          />
        }
        {releaseModalOpen &&
          <ReleaseDetailsModal
            release={this.selectedRelease}
            onClose={this.onModalClose}
          />
        }
      </li>
    )
  }
}
