const BASE_URL = process.env.REACT_APP_BASE_API_URL

const fetchData = (resource, method, body, headers) =>
  new Promise((resolve, reject) => {
    setTimeout(() =>
      fetch(`${BASE_URL}/rest/${resource}`, {
        method: method || 'GET',
        body: body ? JSON.stringify(body) : undefined,
        headers
      }).then(response => resolve(response.json()))
        .catch(err => reject(err)),
      process.env.REACT_APP_THROTTLE_TIME || 0
    )
  })

export const fetchArtists = () => fetchData('artists')
export const fetchArtistTypes = artistID => fetchData(`types?artist=${artistID}`)
export const fetchEntries = (artistID, type) => fetchData(`entries?artist=${artistID}&type=${type}`)
export const fetchReleases = entryID => fetchData(`releases?entry=${entryID}`)

export const fetchRelease = releaseID => fetchData(`release?id=${releaseID}`)
export const fetchEntry = entryID => fetchData(`entry?id=${entryID}`)

export const fetchLabels = () => fetchData('labels')
export const fetchFormats = () => fetchData('formats')
export const fetchCountries = () => fetchData('countries')
