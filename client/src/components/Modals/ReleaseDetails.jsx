import React, { useEffect, useRef, useState } from 'react'

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

const DetailRow = ({ fieldObj, release, onChange, copyMode }) => {
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
        {copyMode ?
          <input key={key} type="text" value={value} onChange={onChange} name={key} />
          :
          value
        }
      </td>
    </tr>
  )
}

const ReleaseDetails = ({ release, closeModal }) => {
  const [copyMode, setCopyMode] = useState(false)
  const [releaseState, setReleaseState] = useState(release)
  const [btnFocused, setBtnFocused] = useState(false)

  const {
    discogs_url,
    name,
    artistName,
    entryName,
    typeName
  } = release

  const onChange = e => {
    const { name, value } = e.target

    setReleaseState(r => ({
      ...r,
      [name]: value
    }))
  }

  const formEl = useRef()

  useEffect(() => {
    formEl.current.focus()
  }, [])

  const onKeyDown = e => {
    e.stopPropagation()

    const { key } = e

    if (key === "Enter" && !btnFocused) {
      closeModal()
    } else if (key === 'ArrowUp' || key === "ArrowDown") {
      e.preventDefault()
    }
  }

  const onSubmit = e => {
    e.preventDefault()

    if (!copyMode) {
      setCopyMode(true)
    } else {
    }
  }

  const onBtnBlur = () => {
    setBtnFocused(false)
    formEl.current.focus()
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
      <form tabIndex="0" ref={formEl} onKeyDown={onKeyDown} className="no-focus-outline">
        <table className="release-block-details">
          <tbody>
            {releaseObjFields.map(
              f => <DetailRow key={f.key} fieldObj={f} onChange={onChange} copyMode={copyMode} release={releaseState} />
            )}
          </tbody>
        </table>
        <button
          type="submit"
          onClick={onSubmit}
          onFocus={() => setBtnFocused(true)}
          onBlur={onBtnBlur}
        >
          {copyMode ? "SUBMIT" : "COPY"}
        </button>
      </form>
    </div>
  )
}

export default ReleaseDetails
