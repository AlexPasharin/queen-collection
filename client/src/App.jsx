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
    entryFilterText: ""
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

  onChangeEntryFilterText = e => {
    this.setState({ entryFilterText: e.target.value })
  }

  render() {
    const { artists, selectedArtist, types, selectedType, entries, entryFilterText } = this.state

    const filteredEntries = entries && entryFilterText ?
      entries.filter(e => e.name.toLowerCase().includes(entryFilterText.toLowerCase().trim())) :
      entries

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
          entries={entries}
        />
        <main>
          <Entries
            entries={filteredEntries}
            artist={selectedArtist}
            type={selectedType}
          />
        </main>
      </div>
    )
  }
}
