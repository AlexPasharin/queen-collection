import React, { Component } from 'react'

import { getReleases } from '../../utils/dataGetters'
import ReleaseDetailsModal from '../Modals/ReleaseDetailsModal'
import Release from './Release'

export default class EntryReleases extends Component {
  state = {
    releases: null,
    selectedReleaseIdx: null,
    detailsOpen: false
  }

  componentDidMount() {
    getReleases(this.props.entryID).then(releases => this.setState({ releases }))
  }

  get hasSelectedRelease() {
    return this.state.selectedReleaseIdx !== null
  }

  get selectedRelease() {
    const { selectedReleaseIdx, releases } = this.state

    return selectedReleaseIdx === null ? null : releases[selectedReleaseIdx]
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

  openReleaseDetails = idx => {
    this.setState({ selectedReleaseIdx: idx, detailsOpen: true })
  }

  toggleSelectedReleaseDetails = () => {
    this.setState(
      prevState => ({ detailsOpen: !prevState.detailsOpen }),
      () => {
        if (!this.state.detailsOpen) {
          this.props.afterReleaseDetailsModalClose()
        }
      }
    )
  }

  render() {
    const { releases, selectedReleaseIdx, detailsOpen } = this.state;
    const selectedRelease = this.selectedRelease;

    if (!releases)
      return (
        <p className="release-view detail__title"> Loading releases...</p>
      )

    if (!releases.length)
      return <p className="release-view detail__title"> This entry does not have releases in the collection</p>

    return (
      <div className="release-view">
        <div className="detail__title"> {releases.length > 1 ? `${releases.length} releases in the collection` : "1 release in the collection"} </div>
        <ul>
          {releases.map((r, idx) =>
            <Release key={r.id} release={r} selected={selectedReleaseIdx === idx} onClick={() => this.openReleaseDetails(idx)} />
          )}
        </ul>
        {detailsOpen && selectedRelease && <ReleaseDetailsModal release={selectedRelease} onClose={this.toggleSelectedReleaseDetails} />}
      </div>
    )
  }
}

