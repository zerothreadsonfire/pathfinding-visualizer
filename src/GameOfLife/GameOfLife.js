import React from 'react';

const numRows = 10;
const numCols = 10;
const operations = [[0, 1], [0, -1], [1, -1], [-1, 1], [1, 1], [-1, -1], [1, 0], [-1, 0]];

const genEmptyGrid = () => {
  const rows = [];

  for (let i = 0; i < numRows; ++i)
    rows.push(new Array(numCols).fill(0));

  return rows;
}

const mutateGrid = (grid) => {
  const newGrid = new Array();

  grid.map(row => {
    const newRow = [...row];
    newGrid.push(newRow);
  })

  return newGrid;
}


const GameOfLife = () => {
  const [grid, setGrid] = React.useState(() => {
    return genEmptyGrid();
  });
  // const [running, setRunning] = React.useState(false);

  // const runningRef = React.useRef(running);
  // runningRef.current = running;

  const runSimulation = () => {
    // if(!runningRef.current) return;
    // console.log(newGrid);
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

    setGrid(newGrid);
    
    // setGrid(newGrid);
    setTimeout(runSimulation, 1000);
  };

  return (
    <>
      <button onClick={() => {
        runSimulation();
      }}>
        Click
      </button>

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
