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
    selectedArtistIdx: null,
    types: null,
    selectedTypeIdx: null,
    entries: null,
    releases: null,
    selectedRelease: null,
    entryFilterText: ""
  }

  async componentDidMount () {
    const urlParams = new URLSearchParams(window.location.search)
    const artist = urlParams.get("artist") || "queen"
    const type = urlParams.get("type") || "studio_album"

    this.setState(await getArtistsData(decode(artist), decode(type)))
  }


  componentDidUpdate(_, prevState) {
    const { artists, types, selectedArtistIdx, selectedTypeIdx } = this.state

    if (selectedArtistIdx === null || selectedTypeIdx === null) {
      return
    }

    if (prevState.selectedArtistIdx === selectedArtistIdx && prevState.selectedTypeIdx === selectedTypeIdx) {
      return
    }

    const selectedArtistName = encode(artists[selectedArtistIdx].name.toLowerCase())
    const selectedTypeName = encode(types[selectedTypeIdx].name.toLowerCase())

    const newurl = `${window.location.origin}?artist=${selectedArtistName}&type=${selectedTypeName}`
    window.history.pushState({ path: newurl },'', newurl)

  }

  onSelectArtist = async artistIdx => {
    this.setState(await getArtistData(this.state.artists, artistIdx))
  }

  onSelectType = async typeIdx => {
    this.setState(await getTypeData(this.state.artists, this.state.types, this.state.selectedArtistIdx, typeIdx))
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
    const { artists, selectedArtistIdx, types, selectedTypeIdx, entries, entryFilterText, selectedRelease } = this.state

    return (
      <div>
        {selectedRelease &&
          <ReleaseDetailsModal release={selectedRelease} onCloseModal={() => this.selectRelease(null)} />
        }
        <div className="main-content">
          <NavBar
            artists={artists}
            selectedArtistIdx={selectedArtistIdx}
            onSelectArtist={this.onSelectArtist}
            types={types}
            selectedTypeIdx={selectedTypeIdx}
            onSelectType={this.onSelectType}
            entryFilterText={entryFilterText}
            onChangeEntryFilterText={this.onChangeEntryFilterText}
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
