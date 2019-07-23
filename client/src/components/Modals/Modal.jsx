import React, { Component } from 'react'
import { createPortal } from 'react-dom'

import '../../styles/Modal.css'

export default class Modal extends Component {
  el = document.createElement('div')

  componentDidMount() {
    document.body.classList.add('has-modal')
    document.body.appendChild(this.el);
    this.el.classList.add('modal-container')
    this.el.addEventListener('click', this.closeFromOutside)
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

  render() {
    return (
      createPortal(
        <div className="modal">
          {this.props.children}
          <button onClick={this.props.onClose}>CLOSE MODAL</button>
        </div>,
        this.el
      )
    )
  }
}
