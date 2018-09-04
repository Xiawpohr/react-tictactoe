import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function Square (props) {
  return (
    <button
      className='square'
      onClick={props.onClick}
    >
      {props.value}
    </button>
  )
}

function calculateWinner (squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

class Board extends React.Component {
  renderSquare (pos) {
    return (
      <Square
        key={pos}
        value={this.props.squares[pos]}
        onClick={() => this.props.onClick(pos)}
      />
    )
  }

  render () {
    let rows = []
    let cells = []
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        cells.push(this.renderSquare(r * 3 + c))
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
}

class Game extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      history: [{
        movement: null,
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true
    }
  }

  handleClick (pos) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    if (calculateWinner(squares) || squares[pos]) return
    squares[pos] = this.state.xIsNext ? 'X' : 'O'
    const col = Math.floor(pos % 3) + 1
    const row = Math.floor(pos / 3) + 1
    this.setState({
      history: history.concat({
        movement: {
          player: this.state.xIsNext ? 'X' : 'O',
          position: [col, row]
        },
        squares
      }),
      stepNumber: this.state.stepNumber + 1,
      xIsNext: !this.state.xIsNext
    })
  }

  jumpTo (step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    })
  }

  render () {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares)
    let status
    if (winner) {
      status = 'Winner: ' + winner
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
    }
    const moves = history.map((step, move) => {
      const desc = move
        ? `Go to move #${move}: ${step.movement.player}(${step.movement.position[0]}, ${step.movement.position[1]})`
        : 'Go to game start'
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })
    return (
      <div className='game'>
        <div className='game-board'>
          <Board
            squares={current.squares}
            onClick={pos => this.handleClick(pos)}
          />
        </div>
        <div className='game-info'>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)
