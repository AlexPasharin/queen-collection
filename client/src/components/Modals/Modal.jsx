import React, { Component, createRef } from 'react'
import { createPortal } from 'react-dom'

import '../../styles/Modal.css'

export default class Modal extends Component {
  el = document.createElement('div')
  modalEl = createRef()

  componentDidMount() {
    this.el.classList.add('modal-container')
    this.el.addEventListener('click', this.closeFromOutside)

    document.body.classList.add('has-modal')
    document.body.appendChild(this.el);

    this.modalEl.current.focus()
  }

  componentWillUnmount() {
    document.body.classList.remove('has-modal')
    document.body.removeChild(this.el)
  }

  closeFromOutside = e => {
    if (e.target === this.el) {
      this.props.onClose()
    }
  }

  onKeyDown = e => {
    const { key } = e
    if (key === 'Tab') {
      e.stopPropagation()
    }
  }

  render() {
    return (
      createPortal(
        <div
          className="modal no-focus-outline"
          tabIndex="0"
          ref={this.modalEl}
          onKeyDown={this.onKeyDown}
        >
          {this.props.children}
          <button className="cta-button" onClick={this.props.onClose}>CLOSE MODAL</button>
        </div>,
        this.el
      )
    )
  }
}
