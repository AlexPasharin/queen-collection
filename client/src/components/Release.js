import React from 'react'

const Release = ({ release }) => {
  return (
    <li className="release-block" key={release.id}>
      {release.discogs_url ?
        <a href={release.discogs_url} target="_blank">{release.discogs_url}</a> :
        "(no discogs url)"
      }
      <div className="release-info-block"><span className="detail__title">Country: </span> {release.country}</div>
      <div className="release-info-block"><span className="detail__title">Format: </span>{release.format} </div>
      <div className="release-info-block"><span className="detail__title">Version: </span>{release.version} </div>
      {release.name &&
        <div className="release-info-block">
          (Released as "<span className="detail__title">{release.name}</span>")
        </div>
      }
    </li>
  )
}

export default Release
