const grid = document.querySelector('.grid');

// Create div rows, columns.
const createGrid = (size) => {
  // Remove all child nodes from the grid
  while (grid.firstChild) {
    grid.removeChild(grid.lastChild);
  }

  // Calculate the number of squares per row and colum
  const squaresPerSide = size;
  const totalSquares = squaresPerSide * squaresPerSide;

  for (let i = 0; i < totalSquares; i++) {
    const square = document.createElement('div');
    square.addEventListener('mouseover', () => {
      square.style.backgroundColor = 'black';
    });
    grid.appendChild(square);
  }

  // Set the grid styles
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = `repeat(${squaresPerSide}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${squaresPerSide}, 1fr)`;

  // Slider
  const slider = document.getElementById('myRange');
  const output = document.getElementById('outputValue');
  output.innerHTML = slider.value;
  slider.value = size;
  output.innerHTML = size;
};

createGrid(16);
