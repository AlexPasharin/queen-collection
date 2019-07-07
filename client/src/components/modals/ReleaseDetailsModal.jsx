import React from 'react'

import Release from '../Release.jsx'

const ReleaseDetailsModal = ({ release, onCloseModal }) => {
  return (
    <div className="modal-container">
        <div className="modal" >
          <Release release={release} extended={true} />
          <span onClick={onCloseModal}>CLOSE MODAL</span>
        </div>
    </div>
  )

}

export default ReleaseDetailsModal
