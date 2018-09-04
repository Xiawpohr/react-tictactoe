import React from 'react'
import Sign from './Sign.js'

function Status (props) {
  let status
  if (props.isFinished) {
    status = <span>No one wins!</span>
  } else if (props.winner) {
    status = <span>Winner: <Sign player={props.winner} /></span>
  } else {
    status = <span>Next player: <Sign player={props.nextPlayer} /></span>
  }
  return (
    <div className='game-status'>
      {status}
    </div>
  )
}

export default Status
