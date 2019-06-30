import React from 'react'
import { getArtistTypes, getArtists, getEntries } from './utils/dataGetters'

import './App.css'
import NavBar from './components/NavBar';

export default class App extends React.Component {
  state = {
    artists: null,
    selectedArtistID: null,
    types: null,
    selectedTypeID: null,
    entries: null
  }

  async componentDidMount () {
    const artists = await getArtists()

    const selectedArtist = artists.find(a => a.name === 'Queen')
    const selectedArtistID = selectedArtist ?
      selectedArtist.id.toString() :
      artists[0].id.toString()

    this.setState({
      artists,
      ...(await this.artistChangeData(selectedArtistID))
    })
  }

  onSelectArtist = async e => {
    this.setState(await this.artistChangeData(e.target.value.toString()))
  }

  onSelectType = async e => {
    this.setState(await this.typeData(e.target.value))
  }

  typeData = async typeID => ({
    selectedTypeID: typeID,
    entries: typeID ? (await getEntries(this.state.selectedArtistID, typeID)) : null
  })

  artistChangeData = async artistID => {
    const types = await getArtistTypes(artistID)
    const selectedTypeID = types.length === 1 ? types[0].id : null

    return ({
      selectedArtistID: artistID,
      types,
      ...(await this.typeData(selectedTypeID))
    })
  }

  render() {
    const { artists, selectedArtistID, types, entries } = this.state

    return (
      <div className="app">
        <NavBar
          artists={artists}
          selectedArtistID={selectedArtistID}
          onSelectArtist={this.onSelectArtist}
          types={types}
          onSelectType={this.onSelectType}
        />
        <main>
        {entries && <ul>
            {entries.map(e => (
              <li key={e.id}>
                <h2>{e.name} </h2>
                <p>Original release date: {e.release_date ? e.release_date : 'unknown'}</p>
              </li>
            ))}
          </ul>
          }
          {/* {content && <ul>
            {content.map(c => (
              <li key={c.id}>
                <h2>{c.name} </h2>
                <p>Country: {c.country}</p>
                <p>Format: {c.format} </p>
                <p>Version: {c.version} </p>
                {c.discogs_url && <a href={c.discogs_url}>{c.discogs_url}</a>}
              </li>
            ))}
          </ul>
          } */}
        </main>
      </div>
    )
  }
}
