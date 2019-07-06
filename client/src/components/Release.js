import React from 'react'

import { formatDate } from '../utils/dataHelpers'

const Release = ({ release, onSelect }) => {
  const { id, discogs_url, country, format, version, release_date, name } = release

  return (
    <li className="release-block" key={id}>
      {discogs_url ?
        <a className="release-discogs-url" href={discogs_url} target="_blank" rel="noopener noreferrer">
          <span>{discogs_url}</span>
        </a> :
        "(no discogs url)"
      }
      <div className="release-info-block"><span className="detail__title">Version: </span>{version} </div>
      <div className="release-info-block"><span className="detail__title">Country: </span> {country}</div>
      <div className="release-info-block"><span className="detail__title">Format: </span>{format} </div>
      <div className="release-info-block"><span className="detail__title">Release date: </span>{ formatDate(release_date)} </div>
      {name &&
        <div className="release-info-block">
          (Released as "<span className="detail__title">{name}</span>")
        </div>
      }
      <div onClick={onSelect}>MORE DETAILS</div>
    </li>
  )
}

export default Release
