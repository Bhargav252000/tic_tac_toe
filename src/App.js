import React from 'react';
import './App.css';
import Game from './components/Game';

function App() {
  return (
    <div className="App">
      <div className = "header">
        Tic-Tac-Toe
      </div>
      <Game />
      <div className="footer">
        Made with <font color="red">♥</font> by <a href="https://github.com/Bhargav252000">Bhargav Gohil</a>
      </div>
    </div>
    
  );
}

export default App;
