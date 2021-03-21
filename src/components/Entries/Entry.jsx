import React, { Component, createRef } from 'react'

import { postNewRelease, updateRelease } from "../../utils/apiCalls"
import { formatDate } from '../../utils/dataHelpers'
import { classList } from '../../utils/classList'
import { getReleases } from '../../utils/dataGetters'

import ReleaseDetailsModal from '../Modals/ReleaseDetailsModal'

import EntryReleases from './EntryReleases'

export default class Entry extends Component {
  state = {
    open: false,
    releases: null,
    selectedReleaseIdx: null, // value null means nothing is selected, value -1 means "add new button is selected"!
    releaseModalOpen: false,
    successfullyAdded: false
  }

  el = createRef()
  buttonEl = createRef()

  // feature not used at the moment, since "selected" is always false on mount
  // componentDidMount() {
  //   if (this.props.selected) {
  //     this.focus()
  //     this.toggleReleasesBlock()
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.selected && this.props.selected) {
      this.focus()
    }

    if (prevState.releaseModalOpen && !this.state.releaseModalOpen) {
      this.focus()
      this.setState({ successfullyAdded: false })
    }

    if (!prevState.open && this.state.open) {
      this.el.current.scrollIntoView()
    }

    if (!prevState.releases && this.state.releases) {
      this.el.current.scrollIntoView()

      if (this.props.initialSelectedReleaseID !== null) {
        const selectedReleaseIdx = this.state.releases.findIndex(r => r.id === this.props.initialSelectedReleaseID)

        this.selectRelease(selectedReleaseIdx)
        this.props.removeInitialSelectedReleaseID()
      }
    }

    if (prevState.selectedReleaseIdx !== -1 && this.state.selectedReleaseIdx === -1) {
      this.buttonEl.current && this.buttonEl.current.focus()
    }

    if (prevState.selectedReleaseIdx === -1 && this.state.selectedReleaseIdx !== -1) {
      this.buttonEl.current && this.buttonEl.current.blur()
      this.focus()
    }

    // if (prevState.selectedReleaseIdx !== this.state.selectedReleaseIdx) {
    //   this.setState({ successfullyAdded: false })
    // }
  }

  get selectedRelease() {
    const { selectedReleaseIdx, releases } = this.state
    const { entry } = this.props
    const { artistName, typeName, entryArtistName, name } = entry

    if (selectedReleaseIdx === null) {
      return null
    }

    const release = selectedReleaseIdx === -1 ?
      {
        entry_id: entry.id,
      } :
      releases[selectedReleaseIdx]

    return ({
      release,
      artistName: entryArtistName || artistName,
      entryName: name,
      typeName
    })
  }

  selectPrevRelease = () => {
    this.setState(prevState => {
      const { selectedReleaseIdx, releases, releaseModalOpen } = prevState
      const amountOfReleases = releases ? releases.length : 0
      const newSelectedReleaseIdx = (selectedReleaseIdx === null) || (releaseModalOpen && selectedReleaseIdx === 0) ?
        amountOfReleases - 1 :
        (selectedReleaseIdx === -1) || (!this.props.authenticated && selectedReleaseIdx === 0) ?
          null : selectedReleaseIdx - 1

      return { selectedReleaseIdx: newSelectedReleaseIdx, successfullyAdded: false }
    })
  }

  selectNextRelease = () => {
    this.setState(prevState => {
      const { selectedReleaseIdx, releases, releaseModalOpen } = prevState
      const amountOfReleases = releases ? releases.length : 0
      const newSelectedReleaseIdx = selectedReleaseIdx === null ?
        (this.props.authenticated ? -1 : 0) :
        selectedReleaseIdx === amountOfReleases - 1 ? (releaseModalOpen ? 0 : null) : selectedReleaseIdx + 1

      return { selectedReleaseIdx: newSelectedReleaseIdx, successfullyAdded: false }
    })
  }

  getReleases = async (preferredSelectedReleaseIndex, successfullyAdded = false) => {
    try {
      this.setState({ releasesLoading: true })

      const releases = await getReleases(this.props.entry.id)
      const newSelectedReleaseIdx = preferredSelectedReleaseIndex ?
        releases.findIndex(r => r.id === preferredSelectedReleaseIndex) : null

      this.setState({
        releases,
        selectedReleaseIdx: newSelectedReleaseIdx,
        releaseModalOpen: newSelectedReleaseIdx !== null,
        successfullyAdded
      })
    } catch {
      this.setState({
        releasesFetchFailed: true
      })
    } finally {
      this.setState({
        releasesLoading: false,
      })
    }
  }

  toggleReleasesBlock = async () => {
    if (this.state.open) {
      this.setState({
        open: false,
        releases: null,
        selectedReleaseIdx: null
      })
    } else {
      this.setState({
        open: true,
        releasesFetchFailed: false
      })

      this.getReleases()
    }
  }

  addRelease = async release => {
    const { release_id } = await postNewRelease(release)

    this.setState({
      releasesFetchFailed: false
    })

    this.getReleases(release_id, true)
  }

  updateRelease = async release => {
    const { id } = await updateRelease(release)

    this.setState({
      releasesLoading: true
    })

    this.getReleases(id)
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
  }

  onFocus = () => {
    if (!this.props.selected)
      this.props.select()
  }

  openAddNewReleaseModal = e => {
    e.stopPropagation()

    this.setState({
      selectedReleaseIdx: -1,
      releaseModalOpen: true
    })
  }

  focus = () => {
    this.el.current.focus()
  }

  render() {
    const { entry, selected, selectedReleaseID, authenticated } = this.props
    const { open, selectedReleaseIdx, releases, releasesLoading, releasesFetchFailed, releaseModalOpen, successfullyAdded } = this.state
    const { name, release_date, entryArtistName } = entry

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
          {entryArtistName && <i><h3>by <b>{entryArtistName}</b></h3></i>}
          <p>
            <span className="detail__title">Original release date: </span>
            {formatDate(release_date)}
          </p>
          {authenticated &&
            <button
              className="cta-button"
              ref={this.buttonEl}
              onClick={this.openAddNewReleaseModal}
            >
              Add new release
          </button>
          }
        </div>
        {open &&
          <EntryReleases
            releases={releases}
            selectedReleaseIdx={selectedReleaseIdx}
            onSelectRelease={this.selectRelease}
            selectedReleaseID={selectedReleaseID}
            releasesLoading={releasesLoading}
            releasesFetchFailed={releasesFetchFailed}
          />
        }
        {releaseModalOpen &&
          <ReleaseDetailsModal
            release={this.selectedRelease}
            onClose={this.onModalClose}
            addRelease={this.addRelease}
            updateRelease={this.updateRelease}
            initialMode={selectedReleaseIdx === -1 ? 'add' : 'details'}
            successfullyAdded={successfullyAdded}
          />
        }
      </li>
    )
  }
}
