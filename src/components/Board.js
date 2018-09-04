import React from 'react'
import Square from './Square.js'

function Board (props) {
  const { squares, winnerSquares, onClick } = props
  let rows = []
  let cells = []
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const pos = r * 3 + c
      cells.push(
        <Square
          key={pos}
          value={squares[pos]}
          isWinnerSquare={winnerSquares && winnerSquares.includes(pos)}
          onClick={() => onClick(pos)}
        />
      )
    }
    rows.push(<div key={r} className='board-row'>{cells}</div>)
    cells = []
  }
  return (
    <div>
      {rows}
    </div>
  )
}

export default Board
