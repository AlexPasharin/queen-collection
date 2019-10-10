import React, { createRef } from 'react'

import NavBar from '../NavBar/NavBar'
import Entries from './Entries'

import '../../styles/App.css'

export default class EntriesMain extends React.Component {
  state = {
    entryFilterText: "",
    selectedEntryIdx: null,
    initialSelectedReleaseID: null
  }

  artistsSelector = createRef()
  typesSelector = createRef()
  filterInput = createRef()

  componentDidUpdate(prevProps) {
    if (prevProps.entries !== this.props.entries) {
      this.onChangeEntryFilterText("")
    }
  }

  onSelectArtist = async artist => {
    if (artist) this.props.updateArtist(artist.name)
  }

  onSelectType = async type => {
    if (type) this.props.updateType(type.name)
  }

  onChangeEntryFilterText = value => {
    this.setState({
      entryFilterText: value,
      selectedEntryIdx: null
    })
  }

  onEntrySelect = selectedEntryIdx => {
    this.setState({ selectedEntryIdx })
  }

  focusArtistsSelector = () => {
    this.artistsSelector.current.focus()
  }

  focusTypesSelector = () => {
    this.typesSelector.current.focus()
  }

  focusEntriesFilter = () => {
    if (this.props.entries.length > 1 && this.filterInput.current) {
      this.filterInput.current.focus()
    } else {
      this.typesSelector.current.blur()
    }
  }

  removeInitialSelectedReleaseID = () => {
    this.setState({ initialSelectedReleaseID: null })
  }

  render() {
    const { artists, types, entries, selectedArtist, selectedType, errorText, infoText } = this.props
    const { selectedEntryIdx, entryFilterText, initialSelectedReleaseID } = this.state

    return (
      <div className="main-content">
        <NavBar
          artists={artists}
          selectedArtist={selectedArtist}
          onSelectArtist={this.onSelectArtist}
          types={types}
          selectedType={selectedType}
          onSelectType={this.onSelectType}
          entryFilterText={entryFilterText}
          onChangeEntryFilterText={this.onChangeEntryFilterText}
          showEntriesFilter={entries.length > 1}
          artistsSelector={this.artistsSelector}
          typesSelector={this.typesSelector}
          filterInput={this.filterInput}
        />
        <main>
          {errorText &&
            <section className="main-error-text">
              {errorText}
            </section>
          }
          {infoText &&
            <section className="main-info-text">
              {infoText}
            </section>
          }
          <Entries
            entryFilterText={entryFilterText}
            entries={entries}
            onEntrySelect={this.onEntrySelect}
            selectedEntryIdx={selectedEntryIdx}
            initialSelectedReleaseID={initialSelectedReleaseID}
            removeInitialSelectedReleaseID={this.removeInitialSelectedReleaseID}
          />
        </main>
      </div>
    )
  }
}

