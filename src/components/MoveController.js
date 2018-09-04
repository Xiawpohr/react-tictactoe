import React from 'react'

function MoveController (props) {
  return (
    <div className='move-controller'>
      <button
        className='btn btn-sm btn-warning pull-xs-right'
        onClick={() => props.reset()}
      >
        reset
      </button>
      <button
        className='btn btn-sm btn-primary pull-xs-right'
        disabled={props.stepNumber === 0}
        onClick={() => props.jumpTo(props.stepNumber - 1)}
      >
        ⇤ Prev
      </button>
      <button
        className='btn btn-sm btn-primary pull-xs-right'
        disabled={props.stepNumber === props.historyLength - 1}
        onClick={() => props.jumpTo(props.stepNumber + 1)}
      >
        Next ⇥
      </button>
    </div>
  )
}

export default MoveController
