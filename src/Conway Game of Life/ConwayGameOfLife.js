import React from 'react';

const numRows = 10;
const numCols = 10;
const operations = [[0,1], [0,-1], [1,-1], [-1,1], [1,1], [-1,-1], [1,0], [-1,0]];

const ConwayGameOfLife = () => {

  const [grid, setGrid] = React.useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; ++i) {
      rows.push(new Array(numCols).fill(0));
    }

    return rows;
  });
  const [running, setRunning] = React.useState(false);

  const runningRef = React.useRef(running);
  runningRef.current = running;

  const mutateGrid = (grid) => {
    const newGrid = [];
    grid.map(row => {
      newGrid.push(row);
    })

    return newGrid;
  }

  const runSimulation = React.useCallback(() => {
    if(!runningRef.current) return;

    for(let i=0; i<numRows; ++i) {
      for(let j=0; j<numCols; ++j) {
        let neighbours = 0;
        operations.forEach(operation => {
          const newX = i + operation[0];
          const newY = j + operation[1];

          if(newX >=0 && newX < numRows && newY >= 0 && newY < numCols) {
            neighbours += grid[newX][newY];
          }
        });

        if(neighbours < 2 || neighbours > 3) {
          const newGrid = mutateGrid(grid);
          newGrid[i][j] = 0;
          setGrid(newGrid);
        } else if (grid[i][j] === 0 && neighbours === 3){
          const newGrid = mutateGrid(grid);
          newGrid[i][j] = 1;
          setGrid(newGrid);
        }
      }
    }

    setTimeout(runSimulation, 1000);
  }, []);

  return (
    <>
      <button onClick={() => {
        setRunning(!running);
        if(running === false) {
          runningRef.current = true;
          runSimulation();
        }
      }}>{running ? 'Stop' : 'Start'}</button>
      <div className="grid-container">
        {grid.map((row, x) => {
          return row.map((cell, y) => {
            return <div
              key={`${x}-${y}`}
              className={"grid__cell " + (grid[x][y] ? "grid__cell--active" : "")}
              onClick={() => {
                const newGrid = mutateGrid(grid);
                newGrid[x][y] = newGrid[x][y] === 0 ? 1 : 0;
                setGrid(newGrid);
              }}>
            </div>
          })
        })}
      </div>
    </>
  )
}

export default ConwayGameOfLife;
