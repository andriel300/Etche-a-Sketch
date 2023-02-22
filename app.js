const grid = document.querySelector('.grid');

// Create div rows, columns.
const createGrid = (size = 16) => {
  // Calculate the number of squares per row and colum

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement('div');
    square.addEventListener('mouseover', () => {
      square.style.backgroundColor = 'black';
    });
    grid.appendChild(square);
  }

  // Set the grid styles
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  // Slider
  const slider = document.getElementById('myRange');
  const output = document.getElementById('outputValue');
  output.innerHTML = size;

  slider.oninput = function () {
    const newSize = this.value;
    output.innerHTML = newSize;

    // Set the size of the squares between 1px and 64px
    const squareSize = Math.min(64, Math.max(1, Math.floor(640 / newSize))) + 'px';

    // Remove all existing squares from the grid
    grid.innerHTML = '';
    // Create the new grid with the specified size and square size
    grid.style.gridTemplateColumns = `repeat(${newSize}, ${squareSize})`;
    grid.style.gridTemplateRows = `repeat(${newSize}, ${squareSize})`;
    createGrid(newSize);
  };
};

createGrid();
