import React from 'react'

import NavBar from '../NavBar/NavBar'
import Entries from './Entries'

import '../../styles/App.css'

export default class EntriesMain extends React.Component {
  state = {
    entryFilterText: "",
    selectedEntryIdx: null,
    initialSelectedReleaseID: null
  }

  componentDidUpdate(prevProps) {
    if (prevProps.entries !== this.props.entries) {
      this.setState({
        entryFilterText: "",
        selectedEntryIdx: null
      })
    }
  }

  onSelectArtist = async artist => {
    if (artist) this.props.updateArtist(artist.name)
  }

  onSelectType = async type => {
    if (type) this.props.updateType(type.name)
  }

  onChangeEntryFilterText = e => {
    this.setState({
      entryFilterText: e.target.value,
      selectedEntryIdx: null
    })
  }

  onEntrySelect = selectedEntryIdx => {
    this.setState({ selectedEntryIdx })
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

