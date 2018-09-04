import React from 'react'

function Sign (props) {
  const color = (props.player === 'X') ? 'text-danger' : 'text-success'
  return <span className={color}> {props.player} </span>
}

export default Sign
