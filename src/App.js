import React from 'react';
import './App.css';
import Pathfinder from './Pathfinder/Pathfinder';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <>
        <Pathfinder />
      </>
    )
  }
}

export default App;
