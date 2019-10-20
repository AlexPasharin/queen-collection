import React, { useContext, useEffect, useState } from 'react'

import { authContext } from "../../context/AuthContext"
import { getTracks } from '../../utils/dataGetters'
import { formatDate } from '../../utils/dataHelpers'

const capitalizeString = str => {
  if (!str) return str

  return str[0].toUpperCase() + str.slice(1)
}

const normalizeKeyString = key =>
  capitalizeString(key.split("_").join(" "))

const releaseObjFields = [
  {
    key: 'version'
  },
  {
    key: 'country'
  },
  {
    key: 'format'
  },
  {
    key: 'release_date',
    format: formatDate
  },
  {
    key: 'label',
  },
  {
    key: 'cat_number',
    text: 'Cat.number'
  },
  {
    key: 'comment'
  },
  {
    key: 'condition_problems'
  }
]

const whiteListedVersion = ['album version', 'original version']

const DetailRow = ({ fieldObj, release }) => {
  const { key, text, format } = fieldObj
  let value = release[key]

  if (value == null) {
    return null
  }

  if (format) {
    value = format(value)
  }

  const title = text || normalizeKeyString(key)

  return (
    <tr>
      <td>{title}:</td>
      <td>
        {value}
      </td>
    </tr>
  )
}

const ReleaseDetails = ({ releaseData, onCopy, onEdit, justAdded }) => {
  const {
    release,
    artistName,
    entryName,
    typeName,
  } = releaseData

  const {
    discogs_url,
    name,
    id
  } = release

  const [{ tracks, tracksLoading, tracksFetchFailed }, setTracks] = useState({
    tracks: [],
    tracksLoading: true,
    tracksFetchFailed: false
  })

  const { authenticated } = useContext(authContext)

  useEffect(() => {
    getTracks(id)
      .then(tracks => setTracks({
        tracks,
        tracksLoading: false,
        tracksFetchFailed: false
      }))
      .catch(() => setTracks({
        tracks: [],
        tracksLoading: false,
        tracksFetchFailed: true
      }))
  }, [id])

  const onKeyDown = e => {
    if (e.key === "Enter") {
      e.stopPropagation()
      e.target.dataset.mode === 'copy' ? onCopy() : onEdit()
    }
  }

  return (
    <div className="release-block">
      {justAdded && <div className="release-block__just-added">Successfully added this release to the database!</div>}
      <div className="release-block__header">
        <h1>{artistName} - {entryName}</h1>
        <div className="release-info-block">
          {typeName}
        </div>
        {name &&
          <div className="release-info-block">
            (Released as "<span className="detail__title">{name}</span>")
        </div>
        }
      </div>
      {discogs_url ?
        <a className="release-discogs-url" href={discogs_url} target="_blank" rel="noopener noreferrer">
          <span>{discogs_url}</span>
        </a> :
        "(no discogs url)"
      }
      <div>
        <table className="release-block-details">
          <tbody>
            {releaseObjFields.map(
              f => <DetailRow key={f.key} fieldObj={f} release={release} />
            )}
          </tbody>
        </table>
        {authenticated &&
          <>
            <button
              className="cta-button"
              data-mode="copy"
              type="button"
              onClick={onCopy}
              onKeyDown={onKeyDown}
            >
              COPY
            </button>
            <button
              className="cta-button"
              data-mode="edit"
              type="button"
              onClick={onEdit}
              onKeyDown={onKeyDown}
            >
              EDIT
            </button>
          </>
        }
        <h3>Tracks:</h3>
        {tracksLoading ?
          "Loading tracks.." :
          tracksFetchFailed ?
            "ERROR: Could not fetch tracks from the database" :
            tracks.map(({ prop, value }) => (
              <table>
                {prop !== "nullValue" && <thead><span className="table-section-name">{prop}</span></thead>}
                <tbody>
                  {value.map(t => (
                    <tr>
                      <td>{t.number}</td>
                      <td>{t.alt_name || t.name}</td>
                      <td>{!whiteListedVersion.includes(t.version) && "(" + t.version + ")"}</td>
                      <td>{t.subversion && "(" + t.subversion + ")"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ))
        }
      </div>
    </div>
  )
}

export default ReleaseDetails
