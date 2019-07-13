import React from 'react'

const EntryReleases = ({ releases, onSelectRelease }) => {
  if (!releases)
    return null

  return releases.length ?
    <div className="release-view">
      <div className="detail__title"> {releases.length > 1 ? `${releases.length} releases in the collection` : "1 release in the collection"} </div>
      <ul>
        {releases.map(r => <li key={r.id} onClick={() => onSelectRelease(r)}><span>{r.version}</span></li>)}
      </ul>
    </div>
    :
    <p className="release-view detail__title"> This entry does not have releases in the collection</p>
}

export default EntryReleases
