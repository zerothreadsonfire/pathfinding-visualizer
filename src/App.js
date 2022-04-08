import React from 'react';
import './App.css';
import Pathfinder from './Pathfinder/Pathfinder';
import GameOfLife from './GameOfLife/GameOfLife';

 const App = () => {
  return(
    <div className='cmp-container'>
      {/* <Pathfinder /> */}
      <GameOfLife />
    </div>
  )
}

export default App;
