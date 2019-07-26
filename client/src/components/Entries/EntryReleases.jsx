import React, { Component, createRef } from 'react'

import { getReleases } from '../../utils/dataGetters'
import Release from './Release'

export default class EntryReleases extends Component {
  state = {
    releases: null,
    selectedReleaseIdx: null,
  }

  el = createRef()

  async componentDidMount() {
    const releases = await getReleases(this.props.entryID)
    this.setState({ releases }, () => {
      this.el.current.focus()
    })
  }

  componentDidUpdate() {
    if (this.state.selectedReleaseIdx === null) {
      this.el.current.focus()
    }
  }

  get selectedRelease() {
    const { selectedReleaseIdx, releases } = this.state
    const { artistName, entryName, typeName } = this.props

    return selectedReleaseIdx === null ?
      null :
      ({
        ...releases[selectedReleaseIdx],
        artistName,
        entryName,
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

  selectRelease = idx => {
    this.setState({
      selectedReleaseIdx: idx,
    })
  }

  toggleSelectedReleaseDetails = () => {
    this.setState(
      prevState => ({ detailsOpen: !prevState.detailsOpen }),
      () => {
        if (!this.state.detailsOpen) {
          this.reFocus()
        }
      }
    )
  }

  handleEnterKeyPress = () => {
    if (this.state.selectedReleaseIdx === null) {
      this.props.close()
    } else {
      this.toggleSelectedReleaseDetails()
    }
  }

  onKeyDown = e => {
    e.preventDefault()
    e.stopPropagation()

    const { key } = e

    if (key === 'ArrowUp') {
      this.selectPrevRelease()
    } else if (key === 'ArrowDown') {
      this.selectNextRelease()
    }

    if (key === "Enter") {
      this.handleEnterKeyPress()
    }
  }

  reFocus = () => {
    this.el.current.focus()
  }

  onFocus = e => {
    e.stopPropagation()
  }

  render() {
    const { releases, selectedReleaseIdx } = this.state;

    if (!releases)
      return (
        <p ref={this.el} className="release-view detail__title no-focus-outline"> Loading releases...</p>
      )

    if (!releases.length)
      return <p ref={this.el} className="release-view detail__title no-focus-outline"> This entry does not have releases in the collection</p>

    return (
      <div
        tabIndex="0"
        className="release-view no-focus-outline"
        ref={this.el}
        onKeyDown={this.onKeyDown}
        onFocus={this.onFocus}
      >
        <div className="detail__title"> {releases.length > 1 ? `${releases.length} releases in the collection` : "1 release in the collection"} </div>
        <ul>
          {releases.map((r, idx) =>
            <Release key={r.id} release={r} selected={selectedReleaseIdx === idx} onSelect={() => this.selectRelease(idx)} />
          )}
        </ul>
      </div>
    )
  }
}

