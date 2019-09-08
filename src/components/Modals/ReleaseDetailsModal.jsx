import React, { useState } from 'react'

import ReleaseDetails from './ReleaseDetails'
import AddReleaseForm from './AddReleaseForm'
import Modal from './Modal'

import '../../styles/Modal.css'

const ReleaseDetailsModal = ({ release, onClose, addRelease, updateRelease, initialMode = 'details' }) => {
  const [mode, setMode] = useState(initialMode)

  const onModalClose = () => {
    let allowClosing = true

    if (mode !== 'details') {
      allowClosing = window.confirm("You are about to close modal. All form information will be lost.")
    }

    if (allowClosing) {
      onClose()
    }
  }

  return (
    <Modal onClose={onModalClose}>
      {mode === 'details' ?
        <ReleaseDetails releaseData={release} onCopy={() => setMode('add')} onEdit={() => setMode('edit')} /> :
        <AddReleaseForm
          initialReleaseData={release}
          addRelease={addRelease}
          updateRelease={updateRelease}
          mode={mode}
        />
      }
    </Modal>
  )
}

export default ReleaseDetailsModal
