import React from 'react';
import Node from './Node';

class Pathfinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: []
    };
  }

  componentDidMount() {
    const grid = [];

    for(let i=0; i<10; ++i) {
      const currentRow = new Array(10).fill(0);
      grid.push(currentRow);
    }

    this.setState({grid});
  }

  render() {
    const {grid} = this.state;
    
    return(
      <div className="grid">
      {
       grid.map((row, x) => {
         return <div key={x} className="grid__row">
           {
             row.map((cell, y) => {
               return <Node key={y} 
              />
             })
           }
         </div>
       })
      }
      </div>
    )
  }
}

export default Pathfinder;
