import React from 'react'
import './App.css'

const BASE_URL = 'http://localhost:2000'

const fetchData = resource =>
  fetch(`${BASE_URL}/rest/${resource}`)
    .then(response => response.json())

const getArtists = () => fetchData('artists')
const getArtistTypes = artistID => fetchData(`types?artist=${artistID}`)

const getReleases = () => fetchData('releaseview')


export default class App extends React.Component {
  state = {
    artists: null,
    selectedArtistID: null,
    types: null,
    content: null
  }

  async componentDidMount () {
    const artists = await getArtists()

    artists.sort((a, b) => {
      const aName = a.name.toLowerCase()
      const bName = b.name.toLowerCase()

      if (aName < bName) return -1
      else if (aName > bName) return 1
      else return 0
    })

    const selectedArtist = artists.find(a => a.name === 'Queen')

    const selectedArtistID = selectedArtist ? selectedArtist.id.toString() : artists[0].id.toString()

    const types = await getArtistTypes(selectedArtistID)


      this.setState({
        artists,
        selectedArtistID,
        types,
//        content
      })
  }

  onSelectArtist = async e => {
    const selectedArtistID = e.target.value.toString()
    const types = await getArtistTypes(selectedArtistID)

    this.setState({ selectedArtistID, types })
  }


  onSelectType = e => {
    const newType = e.target.value

    if (newType) {

    }
  }

  render() {
    const { artists, selectedArtistID, types, content } = this.state

    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-header__title">Queen Collection</h1>
          {artists &&
            <select
              value={selectedArtistID}
              onChange={this.onSelectArtist}
              className="app-header__select-box"
            >
              {artists.map(a => (
                <option key={a.id} value={a.id.toString()}>
                  {a.name}
                </option>
              ))}
            </select>
          }
          {types &&
            <select
              onChange={this.onSelectType}
              className="app-header__select-box"
            >
              {types.length > 1 && <option key="empty" value="" />}
              {types.map(t => (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
          }
        </header>
        <main>
          {content && <ul>
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
          }
        </main>
      </div>
    )
  }
}
