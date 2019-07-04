import React from 'react'
import Release from "./Release"

const EntryReleases = ({ releases }) => {
  if (!releases)
    return null

  return releases.length ?
      <ul className="release-view">
        {releases.map(r => <Release release={r} />)}
      </ul>
      :
      <p className="release-view detail__title"> This entry does not have releases in the collection</p>
}

export default EntryReleases
