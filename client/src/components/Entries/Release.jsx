import React, { useState } from 'react'

import ReleaseDetailsModal from '../Modals/ReleaseDetailsModal'

const Release = ({ release }) => {
  const [detailsOpen, setDetailsOpen] = useState(false)

  return (
    <li>
      <span onClick={() => setDetailsOpen(true)}>{release.version}</span>
      {detailsOpen && <ReleaseDetailsModal release={release} onClose={() => setDetailsOpen(false)} />}
    </li>
  )
}

export default Release
