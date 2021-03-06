import React from 'react'
import Board from './Board.js'
import Status from './Status.js'
import MoveController from './MoveController.js'
import MoveList from './MoveList.js'
import calculateWinCondition from '../utils.js'

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
    this.handleClick = this.handleClick.bind(this)
    this.jumpTo = this.jumpTo.bind(this)
    this.reset = this.reset.bind(this)
  }

  handleClick (pos) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    if (calculateWinCondition(squares) || squares[pos]) return
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

  reset () {
    this.setState({
      history: [{
        movement: null,
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true
    })
  }

  render () {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const win = calculateWinCondition(current.squares)
    return (
      <div className='game'>
        <div className='game-board'>
          <Board
            squares={current.squares}
            winnerSquares={win && win.winnerSquares}
            onClick={this.handleClick}
          />
        </div>
        <div className='game-info'>
          <Status
            winner={win && win.winner}
            isFinished={this.state.stepNumber === 9}
            nextPlayer={this.state.xIsNext ? 'X' : 'O'}
          />
          <MoveController
            historyLength={history.length}
            stepNumber={this.state.stepNumber}
            jumpTo={this.jumpTo}
            reset={this.reset}
          />
          <MoveList
            history={history}
            stepNumber={this.state.stepNumber}
            jumpTo={this.jumpTo}
          />
        </div>
      </div>
    )
  }
}
