import React from 'react'
import { getArtistData, getArtistsData, getTypeData } from './utils/dataGetters'
import { decode, encode } from './utils/stringHelpers'

import NavBar from './components/NavBar/NavBar'
import Entries from './components/Entries/Entries'

import './styles/App.css'

const addQueryParams = (artist, type) => {
  const artistQueryParam = artist ? `artist=${encode(artist.name.toLowerCase())}` : ''
  const typeQueryParam = type ? `type=${encode(type.name.toLowerCase())}` : ''

  const questionMark = artistQueryParam || typeQueryParam ? '?' : ''
  const ampersand = artistQueryParam ? '&' : ''

  const newurl = `${window.location.origin}${questionMark}${artistQueryParam}${ampersand}${typeQueryParam}`
  window.history.pushState({ path: newurl }, '', newurl)
}

export default class App extends React.Component {
  state = {
    artists: null,
    selectedArtist: null,
    types: null,
    selectedType: null,
    entries: null,
    entryFilterText: "",
    selectedEntryIdx: null
  }

  async componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search)
    const artist = urlParams.get("artist") || "queen"
    const type = urlParams.get("type") || "studio_album"

    this.setState(await getArtistsData(decode(artist), decode(type)))
  }

  componentDidUpdate() {
    const { selectedArtist, selectedType } = this.state
    addQueryParams(selectedArtist, selectedType)
  }

  onSelectArtist = async artist => {
    this.setState(await getArtistData(artist))
  }

  onSelectType = async type => {
    this.setState(await getTypeData(this.state.selectedArtist, type))
  }

  get entries() {
    const { entries, entryFilterText } = this.state

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

  selectPrevEntry = () => {
    this.setState(prevState => {
      const { selectedEntryIdx } = prevState
      const newSelectedIdx = selectedEntryIdx === null ? 0 :
        selectedEntryIdx === 0 ? this.entries.length - 1 : selectedEntryIdx - 1

      return ({
        selectedEntryIdx: newSelectedIdx
      })
    })
  }

  selectNextEntry = () => {
    this.setState(prevState => {
      const { selectedEntryIdx } = prevState
      const newSelectedIdx = selectedEntryIdx === null ? 0 :
        selectedEntryIdx === this.entries.length - 1 ? 0 : selectedEntryIdx + 1

      return ({
        selectedEntryIdx: newSelectedIdx
      })
    })
  }

  onEntrySelect = selectedEntryIdx => {
    this.setState({ selectedEntryIdx })
  }

  render() {
    const { artists, selectedArtist, types, selectedType, entries, selectedEntryIdx, entryFilterText } = this.state

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
          <Entries
            entries={this.entries}
            artist={selectedArtist}
            type={selectedType}
            selectPrevEntry={this.selectPrevEntry}
            selectNextEntry={this.selectNextEntry}
            onEntrySelect={this.onEntrySelect}
            selectedEntryIdx={selectedEntryIdx}
          />
        </main>
      </div>
    )
  }
}
