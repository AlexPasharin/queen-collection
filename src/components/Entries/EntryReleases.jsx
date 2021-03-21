import React from 'react'

import Release from './Release'

export default ({ releases, releasesLoading, releasesFetchFailed, selectedReleaseIdx, onSelectRelease }) => {
  if (releasesLoading)
    return (
      <p className="release-view detail__title"> Loading releases...</p>
    )

  if (releasesFetchFailed)
    return (
      <p className="release-view detail__title"> There has been an error fetching releases :(</p>
    )

  if (!releases.length)
    return <p className="release-view detail__title"> This entry does not have releases in the collection</p>

  return (
    <div className="release-view">
      <div className="detail__title"> {releases.length > 1 ? `${releases.length} releases` : "1 release"} in the collection </div>
      <ul>
        {releases.map((r, idx) =>
          <Release key={r.id} release={r} selected={selectedReleaseIdx === idx} onSelect={() => onSelectRelease(idx)} />
        )}
      </ul>
    </div>
  )
}

