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
  }

  el = createRef()
  buttonEl = createRef()

  componentDidMount() {
    if (this.props.selected) {
      this.el.current.focus()
      this.toggleReleasesBlock()
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (!prevProps.selected && this.props.selected) {
      this.el.current.focus()
    }

    if (prevState.releaseModalOpen && !this.state.releaseModalOpen) {
      this.el.current.focus()
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
      this.buttonEl.current.focus()
    }

    if (prevState.selectedReleaseIdx === -1 && this.state.selectedReleaseIdx !== -1) {
      this.buttonEl.current.blur()
      this.el.current.focus()
    }
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
      const newSelectedReleaseIdx = (selectedReleaseIdx === null) || (releaseModalOpen && selectedReleaseIdx === 0) ? amountOfReleases - 1 :
        selectedReleaseIdx === -1 ? null : selectedReleaseIdx - 1

      return { selectedReleaseIdx: newSelectedReleaseIdx }
    })
  }

  selectNextRelease = () => {
    this.setState(prevState => {
      const { selectedReleaseIdx, releases, releaseModalOpen } = prevState
      const amountOfReleases = releases ? releases.length : 0
      const newSelectedReleaseIdx = selectedReleaseIdx === null ? -1 :
        selectedReleaseIdx === amountOfReleases - 1 ? (releaseModalOpen ? 0 : null) : selectedReleaseIdx + 1

      return { selectedReleaseIdx: newSelectedReleaseIdx }
    })
  }

  getReleases = async preferredSelectedReleaseIndex => {
    try {
      const releases = await getReleases(this.props.entry.id)
      const newSelectedReleaseIdx = preferredSelectedReleaseIndex ?
        releases.findIndex(r => r.id === preferredSelectedReleaseIndex) : null

      this.setState({
        releases,
        releasesLoading: false,
        selectedReleaseIdx: newSelectedReleaseIdx,
        releaseModalOpen: newSelectedReleaseIdx !== null,
      })
    } catch {
      this.setState({
        releasesLoading: false,
        releasesFetchFailed: true
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
        releasesLoading: true,
        releasesFetchFailed: false
      })

      this.getReleases()
    }
  }

  addRelease = async release => {
    this.setState({
      releaseModalOpen: false,
      releases: null,
      releasesLoading: true,
      releasesFetchFailed: false
    })

    const { release_id } = await postNewRelease(release)
    this.getReleases(release_id)
  }

  updateRelease = async release => {
    this.setState({
      releaseModalOpen: false,
      releases: null,
      releasesLoading: true
    })

    const { id } = await updateRelease(release)
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

  render() {
    const { entry, selected, selectedReleaseID } = this.props
    const { open, selectedReleaseIdx, releases, releasesLoading, releasesFetchFailed, releaseModalOpen } = this.state
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
          <button
            className="cta-button"
            ref={this.buttonEl}
            onClick={this.openAddNewReleaseModal}
          >
            Add new release
          </button>
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
          />
        }
      </li>
    )
  }
}
