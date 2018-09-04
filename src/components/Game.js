import React from 'react'
import Board from './Board.js'
import calculateWinner from '../utils.js'

export default class Game extends React.Component {
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
          <button onClick={() => this.jumpTo(move)}>{move === this.state.stepNumber ? <b>{desc}</b> : desc}</button>
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
