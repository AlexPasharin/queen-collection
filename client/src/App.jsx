import React from 'react'
import { getArtistData, getArtistsData, getReleases, getTypeData } from './utils/dataGetters'
import { decode, encode } from './utils/stringHelpers'

import './App.css'
import ReleaseDetailsModal from './components/modals/ReleaseDetailsModal'
import NavBar from './components/NavBar'
import Entries from './components/Entries'


export default class App extends React.Component {
  state = {
    artists: null,
    selectedArtist: null,
    types: null,
    selectedType: null,
    entries: null,
    releases: null,
    selectedRelease: null,
    entryFilterText: ""
  }

  async componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search)
    const artist = urlParams.get("artist") || "queen"
    const type = urlParams.get("type") || "studio_album"

    this.setState(await getArtistsData(decode(artist), decode(type)))
  }


  componentDidUpdate(_, prevState) {
    const { selectedArtist: prevSelectedArtist, selectedType: prevSelectedType } = prevState
    const { selectedArtist, selectedType } = this.state

    if (prevSelectedArtist === null || prevSelectedType === null) {
      return
    }

    if (selectedArtist === null || selectedType === null) {
      return
    }

    if (prevSelectedArtist.id === selectedArtist.id && prevSelectedType.id === selectedType.id) {
      return
    }

    const selectedArtistName = encode(selectedArtist.name.toLowerCase())
    const selectedTypeName = encode(selectedType.name.toLowerCase())

    const newurl = `${window.location.origin}?artist=${selectedArtistName}&type=${selectedTypeName}`
    window.history.pushState({ path: newurl }, '', newurl)

  }

  onSelectArtist = async artist => {
    this.setState(await getArtistData(artist))
  }

  onSelectType = async type => {
    this.setState(await getTypeData(this.state.selectedArtist, type))
  }

  onSelectEntry = async entry => {
    let releases = entry.releases

    if (!releases) {
      releases = await getReleases(entry.id)

      const entryIndex = this.state.entries.findIndex(e => e.id === entry.id)
      const newEntries = [...this.state.entries]

      newEntries[entryIndex] = {
        ...entry,
        releases
      }

      this.setState({ entries: newEntries })
    }
  }

  onChangeEntryFilterText = e => {
    this.setState({ entryFilterText: e.target.value })
  }

  selectRelease = (selectedRelease) => {
    this.setState({ selectedRelease })
  }

  render() {
    const { artists, selectedArtist, types, selectedType, entries, entryFilterText, selectedRelease } = this.state

    return (
      <div>
        {selectedRelease &&
          <ReleaseDetailsModal release={selectedRelease} onCloseModal={() => this.selectRelease(null)} />
        }
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
            entries={entries}
          />
          <main>
            <Entries
              entries={entries}
              onSelectEntry={this.onSelectEntry}
              entryFilterText={entryFilterText}
              onSelectRelease={this.selectRelease}
            />
          </main>
        </div>
      </div>
    )
  }
}
