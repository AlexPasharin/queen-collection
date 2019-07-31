import React, { useState } from 'react'

import ReleaseDetails from './ReleaseDetails'
import AddReleaseForm from './AddReleaseForm'
import Modal from './Modal'
import '../../styles/Modal.css'

const ReleaseDetailsModal = ({ release, onClose, initialMode = 'details' }) => {
  const [mode, setMode] = useState(initialMode)

  return (
    <Modal onClose={onClose}>
      {mode === 'details' ?
        <ReleaseDetails release={release} onCopy={() => setMode('add')} /> :
        <AddReleaseForm
          releaseData={release}
        />
      }
    </Modal>
  )
}

export default ReleaseDetailsModal
