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

  onSelectArtist = async artist => {
    if (artist) this.props.updateArtist(artist.name)
  }

  onSelectType = async type => {
    if (type) this.props.updateType(type.name)
  }

  get entries() {
    const { entries } = this.props
    const { entryFilterText } = this.state

    return entries && entryFilterText ?
      entries.filter(e => e.name.toLowerCase().includes(entryFilterText.toLowerCase().trim())) :
      entries
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
          showEntriesFilter={!!entries}
        />
        <main>
          {errorText ?
            <section className="main-error-text">
              {errorText}
            </section>
            : infoText ?
              <section className="main-info-text">
                {infoText}
              </section> :
              <Entries
                entries={this.entries}
                onEntrySelect={this.onEntrySelect}
                selectedEntryIdx={selectedEntryIdx}
                initialSelectedReleaseID={initialSelectedReleaseID}
                removeInitialSelectedReleaseID={this.removeInitialSelectedReleaseID}
              />
          }
        </main>
      </div>
    )
  }
}

