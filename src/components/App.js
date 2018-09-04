import React from 'react'
import Game from './Game.js'

function App (props) {
  return (
    <div className='app'>
      <header>Tic Tac Toe</header>
      <Game />
      <footer>
        <a href='https://github.com/Xiawpohr/react-tictactoe'>Github</a>
      </footer>
    </div>
  )
}

export default App
