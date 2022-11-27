import React, { useEffect } from 'react';

const numRows = 10;
const numCols = 10;
const operations = [[0, 1], [0, -1], [1, -1], [-1, 1], [1, 1], [-1, -1], [1, 0], [-1, 0]];

const GameOfLife = () => {
  const [grid, setGrid] = React.useState(() => {
    const rows = [];

    for (let i = 0; i < numRows; ++i)
      rows.push(new Array(numCols).fill(0));

    return rows;
  });

  const [running, setRunning] = React.useState(false);
  const intervalRef = React.useRef();

  useEffect(() => {
    if(running === true) intervalRef.current = setInterval(() => {
      runSimulation()
    }, 200);
    else {
      clearInterval(intervalRef.current);
    }
    
  }, [running]);

  const runSimulation = () => {
    setGrid((grid) => {
      const newGrid = mutateGrid(grid);

      for (let i = 0; i < numRows; i++) {
        let j = 0;
        for (j = 0; j < numCols; j++) {
          let neighbours = 0;

          operations.forEach(operation => {
            const newX = i + operation[0];
            const newY = j + operation[1];

            if (newX >= 0 && newX < numRows && newY >= 0 && newY < numCols) {
              neighbours += grid[newX][newY];
            }
          });

          if (neighbours < 2 || neighbours > 3) {
            newGrid[i][j] = 0;
          } else if (grid[i][j] === 0 && neighbours === 3) {
            newGrid[i][j] = 1;
          }
        }
      }

      return newGrid;
    });
  };

  const mutateGrid = (grid) => {
    const newGrid = [];
  
    grid.map(row => {
      const newRow = [...row];
      newGrid.push(newRow);
    })
  
    return newGrid;
  }

  return (
    <>
      <button onClick={() => {
        setRunning(!running);
      }}>{running ? "stop" : "start"}</button>

      <div className="grid-container">
        {grid.map((row, rIdx) => {
          return row.map((cell, cIdx) => {
            return <div
              key={`${rIdx}-${cIdx}`}
              className={"grid__cell " + (grid[rIdx][cIdx] ? "grid__cell--active" : "")}
              onClick={() => {
                grid[rIdx][cIdx] = grid[rIdx][cIdx] ? 0 : 1;
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
