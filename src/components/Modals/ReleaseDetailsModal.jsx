import React from 'react'

import ReleaseDetails from './ReleaseDetails'
import Modal from './Modal'

import '../../styles/Modal.css'

const ReleaseDetailsModal = ({ release, onClose }) => {

  const onModalClose = () => {
    let allowClosing = true

    if (allowClosing) {
      onClose()
    }
  }

  return (
    <Modal onClose={onModalClose}>
      <ReleaseDetails releaseData={release} />
    </Modal>
  )
}

export default ReleaseDetailsModal
