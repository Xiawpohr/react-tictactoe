import React from 'react'
import Sign from './Sign'

function Square (props) {
  let className = 'square'
  if (props.isWinnerSquare) {
    className += ' square--winner'
  }
  return (
    <button
      className={className}
      onClick={props.onClick}
    >
      <div className='square-content'>
        <Sign player={props.value} />
      </div>
    </button>
  )
}

export default Square
