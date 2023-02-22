// Select the grid element
const grid = document.querySelector('.grid');

// Create div rows, columns.
const createGrid = (size = 16) => {
  // Calculate the number of squares per row and colum
  const numSquares = size * size;

  // Loop through and create a new square for each
  for (let i = 0; i < numSquares; i++) {
    const square = document.createElement('div');
    // add an event listener to change the square color on hover
    square.addEventListener('mouseover', () => {
      square.style.backgroundColor = 'black';
    });
    // Append the square to the grid
    grid.appendChild(square);
  }

  // Set the grid styles to a grid layout
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  // Initialize the slider
  const slider = document.getElementById('myRange');
  const output = document.getElementById('outputValue');
  output.innerHTML = size;

  // Handle the slider input event
  slider.oninput = function () {
    const newSize = this.value;
    output.innerHTML = newSize;

    // Set the size of the squares between 1px and 64px
    const squareSize = Math.min(64, Math.max(1, Math.floor(640 / newSize))) + 'px';

    // Remove and clear all existing squares from the grid
    grid.innerHTML = '';

    // Set the new grid styles with the updated size and square size
    grid.style.gridTemplateColumns = `repeat(${newSize}, ${squareSize})`;
    grid.style.gridTemplateRows = `repeat(${newSize}, ${squareSize})`;

    // Create the new grid with the updated size of each adjustments slider
    createGrid(newSize);
  };
};

// Call the function to create the initial grid
createGrid();
