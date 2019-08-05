import React from 'react'

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

const ReleaseDetails = ({ releaseData, onCopy }) => {
  const {
    release,
    artistName,
    entryName,
    typeName
  } = releaseData

  const {
    discogs_url,
    name
  } = release

  const onKeyDown = e => {
    if (e.key === "Enter") {
      e.stopPropagation()
      onCopy()
    }
  }

  return (
    <div className="release-block">
      <h1>{artistName} - {entryName}</h1>
      <div className="release-info-block">
        {typeName}
      </div>
      {name &&
        <div className="release-info-block">
          (Released as "<span className="detail__title">{name}</span>")
        </div>
      }
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
        <button
          className="cta-button"
          type="button"
          onClick={onCopy}
          onKeyDown={onKeyDown}
        >
          COPY
        </button>
      </div>
    </div>
  )
}

export default ReleaseDetails
