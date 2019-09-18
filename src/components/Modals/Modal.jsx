import React, { Component, createRef } from 'react'
import { createPortal } from 'react-dom'

import '../../styles/Modal.css'

export default class Modal extends Component {
  el = document.createElement('div')
  modalEl = createRef()
  buttonEl = createRef()

  componentDidMount() {
    this.el.classList.add('modal-container')
    document.body.addEventListener('click', this.closeFromOutside)

    document.body.classList.add('has-modal')
    document.body.appendChild(this.el);

    this.modalEl.current.focus()
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.closeFromOutside)
    document.body.classList.remove('has-modal')
    document.body.removeChild(this.el)
  }

  closeFromOutside = e => {
    if (!this.modalEl.current.contains(e.target)) {
      this.props.onClose()
    }
  }

  // onKeyDown = e => {
  //   const { key } = e
  //   if (key === 'Tab') {
  //     e.stopPropagation()

  //     if (!this.modalEl.contains(e.target)) {
  //       this.modalEl.current.focus()
  //     }
  //   }
  // }

  render() {
    return (
      createPortal(
        <div
          className="modal no-focus-outline"
          tabIndex="0"
          ref={this.modalEl}
        //        onKeyDown={this.onKeyDown}
        >
          {this.props.children}
          <button
            className="cta-button"
            onClick={this.props.onClose}
            ref={this.buttonEl}
          >
            CLOSE MODAL
          </button>
        </div>,
        this.el
      )
    )
  }
}
