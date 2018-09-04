import React from 'react'

function Status (props) {
  let status
  if (props.isFinished) {
    status = 'No one wins!'
  } else if (props.winner) {
    status = `Winner: ${props.winner}`
  } else {
    status = `Next player: ${props.nextPlayer}`
  }
  return (
    <div className='game-status'>
      {status}
    </div>
  )
}

export default Status
