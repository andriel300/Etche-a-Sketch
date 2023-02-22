// Select the grid element
const grid = document.querySelector('.grid');

// initialize the size of the grid
let size = 16;

// Remove and clear all existing squares from the grid
const clearGrid = () => {
  grid.innerHTML = '';
};

// Calculate the number of squares per row and colum
const calculateNumSquares = (size) => size * size;

// Create a new square element
const createSquare = () => {
  const square = document.createElement('div');
  // add an event listener to change the square color on hover
  square.addEventListener('mouseover', () => {
    square.style.backgroundColor = 'black';
  });
  // Append the square to the grid
  return square;
};

// Append the square to the grid
const addSquareToGrid = (square) => {
  grid.appendChild(square);
};

// Set the grid styles to a grid layout
const setGridStyles = (size) => {
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
};

// Create the initial grid
const createGrid = (size) => {
  clearGrid();
  setGridStyles(size);
  const numSquares = calculateNumSquares(size);
  for (let i = 0; i < numSquares; i++) {
    const square = createSquare();
    addSquareToGrid(square);
  }
};

// Initialize the slider
const slider = document.getElementById('myRange');
const output = document.getElementById('outputValue');
output.innerHTML = size;

// Handle the slider input event
slider.oninput = function () {
  const newSize = this.value;
  output.innerHTML = newSize;

  // Set the size of the squares between 1px and 64px
  const squareSize = Math.min(64, Math.max(1, Math.floor(400 / size))) + 'px';

  // Set the new grid styles with the updated size and square size
  setGridStyles(size);

  // Create the new grid with the updated size of each adjustments slider
  createGrid(size);
};

// Call the function to create the initial grid
createGrid(size);
