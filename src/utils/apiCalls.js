const BASE_URL = 'http://localhost:2000'

const fetchData = (resource, method, body, headers) =>
  fetch(`${BASE_URL}/rest/${resource}`, {
    method: method || 'GET',
    body: body ? JSON.stringify(body) : undefined,
    headers
  }).then(response => response.json())


export const fetchArtists = () => fetchData('artists')
export const fetchArtistTypes = artistID => fetchData(`types?artist=${artistID}`)
export const fetchEntries = (artistID, type) => fetchData(`entries?artist=${artistID}&type=${type}`)
export const fetchReleases = entryID => fetchData(`releases?entry=${entryID}`)

export const fetchRelease = releaseID => fetchData(`release?id=${releaseID}`)
export const fetchEntry = entryID => fetchData(`entry?id=${entryID}`)
export const fetchReleaseTracks = releaseID => fetchData(`tracks?release_id=${releaseID}`)
export const fetchCompositions = () => fetchData('compositions')

export const fetchLabels = () => fetchData('labels')
export const fetchFormats = () => fetchData('formats')
export const fetchCountries = () => fetchData('countries')

export const postNewRelease = release => fetchData('release', 'POST', release,
  {
    'Content-Type': "application/json"
  }
).catch(e => {
  console.log("Release add failed:", e)

  return { release_id: null }
})


export const updateRelease = release => fetchData('release', 'PUT', release,
  {
    'Content-Type': "application/json"
  }
).catch(e => {
  console.log("Release update failed:", e)

  return { id: null }
})
