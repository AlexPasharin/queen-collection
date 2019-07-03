import React from 'react'

const Release = ({ release }) => {
  return (
    <li className="release-block" key={release.id}>
      <h2>{release.name} </h2>
      <p>Country: {release.country}</p>
      <p>Format: {release.format} </p>
      <p>Version: {release.version} </p>
      {release.discogs_url && <a href={release.discogs_url}>{release.discogs_url}</a>}
    </li>
  )
}

export default Release
