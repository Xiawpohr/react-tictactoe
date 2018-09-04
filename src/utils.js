function calculateWinCondition (squares) {
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
  const winnerLine = lines.find(line => {
    const [a, b, c] = line
    return squares[a] && squares[a] === squares[b] && squares[a] === squares[c]
  })

  if (!winnerLine) return null
  return {
    winner: squares[winnerLine[0]],
    winnerSquares: winnerLine
  }
}

export default calculateWinCondition
