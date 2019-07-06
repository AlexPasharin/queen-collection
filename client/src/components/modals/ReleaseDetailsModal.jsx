import React from 'react'

import Release from '../Release'

const ReleaseDetailsModal = ({ release, onCloseModal }) => {
  return (
    <div className="modal-container">
        <div className="modal" >
          <Release release={release}/>
          <span onClick={onCloseModal}>CLOSE MODAL</span>
        </div>
    </div>
  )

}

export default ReleaseDetailsModal
