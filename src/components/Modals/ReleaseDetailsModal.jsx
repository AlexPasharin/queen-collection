import React, { useState } from 'react'

import ReleaseDetails from './ReleaseDetails'
import AddReleaseForm from './AddReleaseForm'
import Modal from './Modal'

import '../../styles/Modal.css'

export default ({ release, onClose, addRelease, updateRelease, initialMode, successfullyAdded}) => {
  const [mode, setMode] = useState(initialMode)

  const onModalClose = () => {
    const allowClosing = mode === 'details' ? true : window.confirm("You are about to close modal. All form information will be lost.")

    if (allowClosing) {
      onClose()
    }
  }

  return (
    <Modal onClose={onModalClose}>
      {mode === 'details' ?
        <ReleaseDetails justAdded={successfullyAdded} releaseData={release} onCopy={() => setMode('add')} onEdit={() => setMode('edit')} /> :
        <AddReleaseForm
          initialReleaseData={release}
          addRelease={addRelease}
          updateRelease={updateRelease}
          mode={mode}
          closeModal={onClose}
        />
      }
    </Modal>
  )
}
