import React, { forwardRef } from 'react'

import { classList } from '../../utils/classList'

const SelectorItem = forwardRef(({ name, selected, onClick, onMouseEnter }, ref) =>
  <li
    className={classList("selector-list__element", {
      selected
    })}
    ref={ref}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
  >
    {name}
  </li>
)

export default SelectorItem
