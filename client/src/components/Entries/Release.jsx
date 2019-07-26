import React, { useLayoutEffect, useState, useRef } from 'react'

import ReleaseDetailsModal from '../Modals/ReleaseDetailsModal'

const Release = ({ release, selected, onSelect }) => {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const el = useRef()

  useLayoutEffect(() => {
    if (selected) {
      el.current.focus()
    } else {
      el.current.blur()
    }
  }, [selected])

  useLayoutEffect(() => {
    if (detailsOpen) {
      el.current.blur()
    } else {
      el.current.focus()
    }
  }, [detailsOpen])

  const onKeyDown = e => {
    if (e.key === "Enter") {
      e.preventDefault()
      e.stopPropagation()
      setDetailsOpen(true)
    }
  }

  const onMouseDown = e => e.preventDefault()

  const onReleaseSelect = () => {
    onSelect()
    setDetailsOpen(true)
  }

  return (
    <li
      tabIndex="0"
      ref={el}
      onKeyDown={onKeyDown}
      className="no-focus-outline"
    >
      <span
        className={selected ? "entry-block-release--selected" : ""}
        onMouseDown={onMouseDown}
        onClick={onReleaseSelect}
      >
        {release.version}
      </span>
      {detailsOpen &&
        <ReleaseDetailsModal
          release={release}
          onClose={() => setDetailsOpen(false)}
        />
      }
    </li>
  )
}

export default Release
