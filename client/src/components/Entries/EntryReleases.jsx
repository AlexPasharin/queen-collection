import React from 'react'

import Release from './Release'

const EntryReleases = ({ releases, selectedReleaseIdx, onSelectRelease }) => {
  if (!releases)
    return (
      <p className="release-view detail__title"> Loading releases...</p>
    )

  if (!releases.length)
    return <p className="release-view detail__title"> This entry does not have releases in the collection</p>

  return (
    <div className="release-view">
      <div className="detail__title"> {releases.length > 1 ? `${releases.length} releases in the collection` : "1 release in the collection"} </div>
      <ul>
        {releases.map((r, idx) =>
          <Release key={r.id} release={r} selected={selectedReleaseIdx === idx} onSelect={() => onSelectRelease(idx)} />
        )}
      </ul>
    </div>
  )
}

export default EntryReleases

