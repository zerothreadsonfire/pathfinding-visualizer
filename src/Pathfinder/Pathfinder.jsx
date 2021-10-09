import React from 'react';

class Pathfinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: []
    };
  }

  componentDidMount() {
    const grid = [];

    for(let i=0; i<50; ++i) {
      const currentRow = new Array(50).fill(0);
      grid.push(currentRow);
    }

    this.setState({grid});
  }

  render() {
    const {grid} = this.state;
    
    return(
      <div>
      {
        grid.map(row => {
          row.map(cell => {
            <div className="cell"></div>
          })
        })
      }
      </div>
    )
  }
}

export default Pathfinder;
