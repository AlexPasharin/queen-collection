import React from 'react'

import ReleaseDetails from './ReleaseDetails'
import Modal from './Modal'
import '../../styles/Modal.css'

const ReleaseDetailsModal = ({ release, onClose }) => {
  return (
    <Modal onClose={onClose}>
      <ReleaseDetails release={release} />
    </Modal>
  )
}

export default ReleaseDetailsModal
