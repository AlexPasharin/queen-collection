import React from 'react'
import { getArtistTypes, getArtists, getEntries, getReleases } from './utils/dataGetters'

import './App.css'
import NavBar from './components/NavBar';

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
        {entries && <ul>
            {entries.map(e => (
              <li className="entry-block" key={e.id} onClick={() => this.onSelectEntry(e)}>
                <h2>{e.name} </h2>
                <p>Original release date: {e.release_date ? e.release_date : 'unknown'}</p>
                {e.releases &&
                  <ul className="release-view">{
                    e.releases.map(r => (
                      <li className="release-block" key={r.id}>
                        <h2>{r.name} </h2>
                        <p>Country: {r.country}</p>
                        <p>Format: {r.format} </p>
                        <p>Version: {r.version} </p>
                        {r.discogs_url && <a href={r.discogs_url}>{r.discogs_url}</a>}
                      </li>
                    ))
                  }</ul>
                  }
              </li>
            ))}
          </ul>
          }
        </main>
      </div>
    )
  }
}
