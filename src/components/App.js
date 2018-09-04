import React from 'react'
import Game from './Game.js'

function App (props) {
  return (
    <div className='app'>
      <header>Tic Tac Toe</header>
      <Game />
      <footer>
        <a href='#'>Github</a>
      </footer>
    </div>
  )
}

export default App
