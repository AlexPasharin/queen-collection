import React from 'react'
import { getArtistTypes, getArtists, getEntries, getReleases } from './utils/dataGetters'

import './App.css'
import NavBar from './components/NavBar';
import Entry from './components/Entry';

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

    const selectedArtist = artists.find(a => a.name === 'Queen')
    const selectedArtistID = selectedArtist ?
      selectedArtist.id.toString() :
      artists[0].id.toString()

    this.setState({
      artists,
      ...(await this.artistData(selectedArtistID))
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

  artistData = async artistID => {
    const types = await getArtistTypes(artistID)
    const selectedTypeID = types.length === 1 ? types[0].id : null

    console.log({artistID, types, selectedTypeID})

    return ({
      selectedArtistID: artistID,
      types,
      ...(await this.typeData(artistID, selectedTypeID))
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
