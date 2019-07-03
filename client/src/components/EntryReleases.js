import React from 'react'
import Release from "./Release"

const EntryReleases = ({ releases }) => {
  if (!releases)
    return null

  return (
    <div className="release-view">
      {
        releases.length ?
        (
          <ul >
            {releases.map(r => <Release release={r} />)}
          </ul>
        )
        :
        <p> This entry does not have releases in the collection</p>
      }
    </div>
  )
}

export default EntryReleases
