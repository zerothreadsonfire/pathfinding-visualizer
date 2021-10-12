import React from 'react';
import './App.css';
import Pathfinder from './Pathfinder/Pathfinder';
import ConwayGameOfLife from './Conway Game of Life/ConwayGameOfLife';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="cmp-container">
        {/* <Pathfinder /> */}
        <ConwayGameOfLife />
      </div>
    )
  }
}

export default App;
