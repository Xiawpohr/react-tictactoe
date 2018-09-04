import React from 'react'

export default class MoveList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isAscending: true
    }
    this.toggleOrder = this.toggleOrder.bind(this)
  }

  toggleOrder () {
    this.setState({
      isAscending: !this.state.isAscending
    })
  }

  render () {
    const { history, stepNumber } = this.props
    const moves = history.map((step, move) => {
      const desc = move
      ? `Move #${move}: ${step.movement.player}(${step.movement.position[0]}, ${step.movement.position[1]})`
      : 'Game Start'
      return (
        <li key={move}>
          <button onClick={() => this.props.jumpTo(move)}>{move === stepNumber ? <b>{desc}</b> : desc}</button>
        </li>
      )
    })
    const orderedMoves = this.state.isAscending ? moves : moves.reverse()
    return (
      <div>
        <button onClick={this.toggleOrder}>{this.state.isAscending ? 'Asce' : 'Desc'}</button>
        <ul>{orderedMoves}</ul>
      </div>
    )
  }
}
