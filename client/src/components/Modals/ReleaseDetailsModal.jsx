import React from 'react'

import ReleaseDetails from './ReleaseDetails'
import Modal from './Modal'
import '../../styles/Modal.css'

const ReleaseDetailsModal = ({ release, onClose }) => (
  <Modal onClose={onClose}>
    <ReleaseDetails release={release} closeModal={onClose} />
  </Modal>
)

export default ReleaseDetailsModal