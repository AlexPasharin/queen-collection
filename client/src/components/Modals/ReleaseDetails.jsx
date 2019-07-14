import React from 'react'

import { formatDate } from '../../utils/dataHelpers'

const ReleaseDetails = ({ release }) => {
  const { discogs_url, country, format, version, release_date, name } = release

  return (
    <div className="release-block">
      {discogs_url ?
        <a className="release-discogs-url" href={discogs_url} target="_blank" rel="noopener noreferrer">
          <span>{discogs_url}</span>
        </a> :
        "(no discogs url)"
      }
      <table className="release-block-details">
        <tbody>
          <tr>
            <td>Version: </td>
            <td>{version} </td>
          </tr>
          <tr>
            <td>Country: </td>
            <td>{country}</td>
          </tr>
          <tr>
            <td>Format: </td>
            <td>{format} </td>
          </tr>
          <tr>
            <td>Release date: </td>
            <td>{formatDate(release_date)} </td>
          </tr>
        </tbody>
      </table>
      {name &&
        <div className="release-info-block">
          (Released as "<span className="detail__title">{name}</span>")
        </div>
      }
      {/* <div className="release-info-block"><span className="detail__title">Version: </span>{version} </div>
      <div className="release-info-block"><span className="detail__title">Country: </span> {country}</div>
      <div className="release-info-block"><span className="detail__title">Format: </span>{format} </div>
      <div className="release-info-block"><span className="detail__title">Release date: </span>{ formatDate(release_date)} </div>
      {name &&
        <div className="release-info-block">
          (Released as "<span className="detail__title">{name}</span>")
        </div>
      } */}
    </div>
  )
}

export default ReleaseDetails
