import React from 'react'
import { getArtistData, getArtistsData, getRelease, getTypeData, getEntry } from '../../utils/dataGetters'
import { decode, encode } from '../../utils/stringHelpers'

import NavBar from '../NavBar/NavBar'
import Entries from './Entries'

import '../../styles/App.css'

const addQueryParams = (artist, type) => {
  const artistQueryParam = artist ? `artist=${encode(artist.name.toLowerCase())}` : ''
  const typeQueryParam = type ? `type=${encode(type.name.toLowerCase())}` : ''

  const questionMark = artistQueryParam || typeQueryParam ? '?' : ''
  const ampersand = artistQueryParam ? '&' : ''

  const newurl = `${window.location.origin}${questionMark}${artistQueryParam}${ampersand}${typeQueryParam}`
  window.history.pushState({ path: newurl }, '', newurl)
}

export default class EntriesMain extends React.Component {
  state = {
    artists: null,
    selectedArtist: null,
    types: null,
    selectedType: null,
    entries: null,
    entryFilterText: "",
    selectedEntryIdx: null,
    initialSelectedReleaseID: null
  }

  async componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search)

    let artistID
    let typeID
    const releaseID = urlParams.get("release")
    let entry

    if (releaseID) {
      const { entry_id } = await getRelease(releaseID)
      entry = await getEntry(entry_id)
      artistID = entry.artist_id
      typeID = entry.type
    }

    const artist = {
      id: artistID || null,
      name: decode(urlParams.get("artist") || "queen")
    }

    const type = {
      id: typeID || null,
      name: decode(urlParams.get("type") || "studio_album")
    }

    const basicData = await getArtistsData(artist, type)

    const selectedEntryIdx = entry ? basicData.entries.findIndex(e => e.id === entry.id) : null

    this.setState({
      ...basicData,
      selectedEntryIdx,
      initialSelectedReleaseID: releaseID
    })
  }

  componentDidUpdate() {
    const { selectedArtist, selectedType } = this.state
    addQueryParams(selectedArtist, selectedType)
  }

  onSelectArtist = async artist => {
    this.setState(await getArtistData(artist, this.state.selectedType && { name: this.state.selectedType.name }, this.state.artists))
  }

  onSelectType = async type => {
    this.setState(await getTypeData(this.state.selectedArtist, type, this.state.artists))
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

  onEntrySelect = selectedEntryIdx => {
    this.setState({ selectedEntryIdx })
  }

  removeInitialSelectedReleaseID = () => {
    this.setState({ initialSelectedReleaseID: null })
  }

  render() {
    const { artists, selectedArtist, types, selectedType, entries, selectedEntryIdx, entryFilterText, initialSelectedReleaseID } = this.state

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
            onEntrySelect={this.onEntrySelect}
            selectedEntryIdx={selectedEntryIdx}
            initialSelectedReleaseID={initialSelectedReleaseID}
            removeInitialSelectedReleaseID={this.removeInitialSelectedReleaseID}
          />
        </main>
      </div>
    )
  }
}

