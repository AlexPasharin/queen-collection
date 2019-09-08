import React from 'react'

const Release = ({ release, selected, onSelect }) => (
  <li>
    <span
      className={selected ? "entry-block-release--selected" : ""}
      onClick={onSelect}
    >
      {release.version}
    </span>
  </li>
)

export default Release
