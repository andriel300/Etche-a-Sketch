// Variables for DOM elements
const canvas = document.querySelector('#canvas');
const clearColorsBtn = document.getElementById('clear-colors-btn');
const colorPen = document.getElementById('color-picker');
const rgbPenBtn = document.getElementById('rgb-pen-btn');
const colorPenBtn = document.getElementById('color-pen-btn');
const rangeSlider = document.getElementById('myRange');
const outputValue = document.getElementById('outputValue');

// Add event listeners to the buttons
clearColorsBtn.addEventListener('click', () => {
  const cells = document.querySelectorAll('#canvas > div');
  cells.forEach((cell) => (cell.style.backgroundColor = ''));
});
colorPen.onclick = function () {
  colorPen.classList.add('active');
  rgbPenBtn.classList.remove('active');
};
rgbPenBtn.addEventListener('click', toggleRainbowPicker);
colorPenBtn.addEventListener('click', selectColorPen);
// initialize the size of the grid
let size = 16;

let isDrawing = false;

// Set the grid styles to a grid layout
const setGridStyles = (size) => {
  canvas.style.display = 'grid';
  canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`;
};

// Create the initial grid
const createGrid = (size) => {
  canvas.innerHTML = '';
  const numCells = size * size;
  for (let i = 0; i < numCells; i++) {
    // create Paint cells
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.style.backgroundColor = 'rgba(255, 255, 255, 0)';
    // Handle mouse move events to click to paint
    cell.addEventListener('mousemove', (event) => {
      if (event.buttons === 1) {
        cell.style.backgroundColor = rgbPenBtn.classList.contains('active') ? getRandomRainbowColor() : brushColor;
      } else if (event.buttons === 2) {
        cell.style.backgroundColor = 'white';
        cell.addEventListener('mousemove', handleRightEraseClick);
      }
    });
    cell.addEventListener('contextmenu', (event) => event.preventDefault());
    // handle eraser right click
    function handleRightEraseClick(event) {
      if (event.buttons === 2) {
        cell.style.backgroundColor = 'white';
      } else {
        cell.removeEventListener('mousemove', handleRightEraseClick);
      }
    }
    canvas.appendChild(cell);
  }
};
// Use template literals and ternary operator
outputValue.innerHTML = `${size} x ${size}`;
rangeSlider.addEventListener('input', (e) => {
  size = e.target.value;
  outputValue.innerHTML = `${size} x ${size}`;
  const cellSize = `${Math.min(64, Math.max(1, Math.floor(650 / size)))}px`;
  setGridStyles(size);
  createGrid(size);
});
// Call the function to create the initial grid
createGrid(size);

let isRainbowPickerActive = false;
let brushColor = colorPen.value;

// define the selectColorPen function
function selectColorPen() {
  colorPenBtn.classList.add('active');
  rgbPenBtn.classList.remove('active');
  colorPen.select();
}

// Set initial brush color to the default color picker value
colorPen.addEventListener('input', () => {
  brushColor = colorPen.value;
});

// Define the rainbowPicker function
function toggleRainbowPicker() {
  isRainbowPickerActive = !isRainbowPickerActive;
  rgbPenBtn.classList.toggle('active');
  colorPen.classList.toggle('active');
  if (isRainbowPickerActive) {
    cell.addEventListener('mousedown', () => (isDrawing = true));
    cell.addEventListener('mouseup', () => (isDrawing = false));
    cell.addEventListener('mouseenter', () => {
      if (isDrawing) {
        cell.style.backgroundColor = getRandomRainbowColor();
      }
    });
  } else {
    cell.removeEventListener('mousedown', () => (isDrawing = true));
    cell.removeEventListener('mouseup', () => (isDrawing = false));
    cell.removeEventListener('mouseenter', () => {}); // Empty function to remove event listener for mouseenter event when rainbow picker is not active
  }
}

// Function to generate random rainbow color
function getRandomRainbowColor() {
  const hue = Math.floor(Math.random() * 361); // Generate a random hue value between 0 and 360
  const saturation = '80%';
  const lightness = '60%';
  const alpha = '1'; // Set the alpha value to 1
  return `hsl(${hue}, ${saturation}, ${lightness}, ${alpha})`;
}
