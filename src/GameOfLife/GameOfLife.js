import React from 'react';

const numRows = 10;
const numCols = 10;
const operations = [[0,1], [0,-1], [1,-1], [-1,1], [1,1], [-1,-1], [1,0], [-1,0]];

const GameOfLife = () => {
  const [grid, setGrid] = React.useState(() => {
    const rows = [];

    for (let i = 0; i < numRows; ++i) 
      rows.push(new Array(numCols).fill(0));

    return rows;
  });
  const [running, setRunning] = React.useState(false);

  // const runningRef = React.useRef(running);
  // runningRef.current = running;

  const mutateGrid = (grid) => {
    const newGrid = new Array();
    
    grid.map(row => {
      const newRow = new Array();
      row.map((x, i) => newRow[i]=x);
      newGrid.push(newRow);
    })
    
    return newGrid;
  }

  const runSimulation = React.useCallback(() => {
    // if(!runningRef.current) return;
    const newGrid = mutateGrid(grid);
    console.log(newGrid);

    for(let i=0; i<numRows; i++) {
      let j=0;
      for(j=0; j<numCols; j++) {
        let neighbours = 0;

        operations.forEach(operation => {
          const newX = i + operation[0];
          const newY = j + operation[1];

          if(newX >=0 && newX < numRows && newY >= 0 && newY < numCols) {
            neighbours += grid[newX][newY];
          }
        });

        if(neighbours < 2 || neighbours > 3) {
          newGrid[i][j] = 0;
        } else if (grid[i][j] === 0 && neighbours === 3) {
          newGrid[i][j] = 1;
        }
      }
      console.log("i="+i+"j="+j);
    }
  
    setGrid(newGrid);

    // setTimeout(runSimulation, 100);
  }, []);

  const toggleButton = () => {
    runSimulation();
  }

  return (
    <>
      <button onClick={toggleButton}>
        Click
      </button>

      <div className="grid-container">
        {grid.map((row, rIdx) => {
          return row.map((cell, cIdx) => {
            return <div
              key={`${rIdx}-${cIdx}`}
              className={"grid__cell " + (grid[rIdx][cIdx] ? "grid__cell--active" : "")}
              onClick={() => {
                grid[rIdx][cIdx] = grid[rIdx][cIdx] === 0 ? 1 : 0;
                const newGrid = mutateGrid(grid);
                setGrid(newGrid);
              }}>
            </div>
          })
        })}
      </div>

    </>
  )

  
}

export default GameOfLife;
