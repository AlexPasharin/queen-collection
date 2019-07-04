import React from 'react'
import { getArtistTypes, getArtists, getEntries, getReleases } from './utils/dataGetters'

import './App.css'
import NavBar from './components/NavBar'
import Entry from './components/Entry'

export default class App extends React.Component {
  state = {
    artists: null,
    selectedArtistID: null,
    types: null,
    selectedTypeID: null,
    entries: null,
    releases: null
  }

  async componentDidMount () {
    const artists = await getArtists()

    const urlParams = new URLSearchParams(window.location.search)
    const artist = urlParams.get("artist") || "queen"
    const type = urlParams.get("type") || "studio_album"

    let selectedArtist = artists.find(a => a.name.trim().toLowerCase() === artist.toLowerCase().replace("_", " "))

    if (!selectedArtist) {
      selectedArtist = artists[0]
    }

    this.setState({
      artists,
      ...(await this.artistData(selectedArtist.id, type.replace("_", " ")))
    })
  }

  onSelectArtist = async e => {
    this.setState(await this.artistData(e.target.value.toString()))
  }

  onSelectType = async e => {
    this.setState(await this.typeData(this.state.selectedArtistID, e.target.value || null))
  }

  typeData = async (artistID, typeID) => ({
    selectedTypeID: typeID,
    entries: typeID ? (await getEntries(artistID, typeID)) : null
  })

  artistData = async (artistID, typeRequestString) => {
    const types = await getArtistTypes(artistID)

    const selectedType = (typeRequestString && types.find(
      t => t.name.trim().toLowerCase() === typeRequestString.toLowerCase()
    )) || (types.length === 1 && types[0]) || null

    return ({
      selectedArtistID: artistID,
      types,
      ...(await this.typeData(artistID, selectedType? selectedType.id : null))
    })
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

  render() {
    const { artists, selectedArtistID, types, selectedTypeID, entries } = this.state

    return (
      <div className="app">
        <NavBar
          artists={artists}
          selectedArtistID={selectedArtistID}
          onSelectArtist={this.onSelectArtist}
          types={types}
          selectedTypeID={selectedTypeID}
          onSelectType={this.onSelectType}
        />
        <main>
        {entries &&
          <ul className="entry-list">
            {entries.map(e => <Entry entry={e} onSelectEntry={() => this.onSelectEntry(e)}/>)}
          </ul>
        }
        </main>
      </div>
    )
  }
}
