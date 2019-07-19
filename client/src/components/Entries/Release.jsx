import React from 'react'

const Release = ({ release, selected, onClick }) => (
  <li>
    <span
      className={selected ? "entry-block-release--selected" : ""}
      onClick={onClick}
    >
      {release.version}
    </span>
  </li>
)

export default Release
