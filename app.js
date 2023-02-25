const grid = document.querySelector('.grid');
const clearColorsBtn = document.getElementById('clear-colors-btn');
const colorPicker = document.getElementById('color-picker');
const rainbowPickerBtn = document.getElementById('rgb-picker-btn');
const colorPickerBtn = document.getElementById('color-picker-btn');
const squares = document.querySelectorAll('.grid > div');

// Add event listeners to the buttons
clearColorsBtn.onclick = clearAllColors;
colorPicker.onclick = function () {
  colorPicker.classList.add('active');
  rainbowPickerBtn.classList.remove('active');
};
rainbowPickerBtn.onclick = rainbowPicker;
colorPickerBtn.onclick = selectColorPicker;

// initialize the size of the grid
let size = 16;

// Remove and clear all existing squares from the grid
const clearGrid = () => {
  grid.innerHTML = '';
};

// Calculate the number of squares per row and colum
const calculateNumSquares = (size) => size * size;

let isDrawing = false;

// Create a new square element
const paintSquare = () => {
  const square = document.createElement('div');

  // Add event listener to change the square color on left-clicked
  square.addEventListener('mousemove', changeSquareColorOnMouseMove);

  // Prevent context menu from showing up on right-click
  square.addEventListener('contextmenu', (event) => {
    event.preventDefault();
  });

  // Function to handle mouse move events on the square
  function changeSquareColorOnMouseMove(event) {
    if (event.buttons === 1) {
      if (rainbowPickerBtn.classList.contains('active')) {
        square.style.backgroundColor = getRandomRainbowColor();
      } else {
        square.style.backgroundColor = colorPicker.value;
      }
    } else if (event.buttons === 2) {
      square.style.backgroundColor = 'white';
      square.addEventListener('mousemove', handleRightEraseClick);
    }
  }

  // Function to handle right click events on the square
  function handleRightEraseClick(event) {
    if (event.buttons === 2) {
      square.style.backgroundColor = 'white';
    } else {
      square.removeEventListener('mousemove', handleRightEraseClick);
    }
  }

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
    const square = paintSquare();
    addSquareToGrid(square);
  }
};

// Initialize the slider
const slider = document.getElementById('myRange');
const output = document.getElementById('outputValue');
output.innerHTML = `${size} x ${size}`;

// Handle the slider input event
slider.addEventListener('input', (e) => {
  size = e.target.value;
  output.innerHTML = `${size} x ${size}`;

  // Set the size of the squares between 1px and 64px
  const squareSize = Math.min(64, Math.max(1, Math.floor(400 / size))) + 'px';

  // Set the new grid styles with the updated size and square size
  setGridStyles(size);

  // Create the new grid with the updated size of each adjustments slider
  createGrid(size);
});

// Call the function to create the initial grid
createGrid(size);

let isRainbowPickerActive = false;
let brushColor = colorPicker.value;

// define the selectColorPicker function
function selectColorPicker() {
  colorPickerBtn.classList.add('active');
  rainbowPickerBtn.classList.remove('active');
  colorPicker.click();
}

// Set initial brush color to the default color picker value
colorPicker.addEventListener('input', () => {
  brushColor = colorPicker.value;
});

// Define the clearColors function
function clearAllColors() {
  const squares = document.querySelectorAll('.grid > div');
  squares.forEach((square) => {
    square.style.backgroundColor = '';
  });
}

// Define the rainbowPicker function
function rainbowPicker() {
  isRainbowPickerActive = !isRainbowPickerActive;
  rainbowPickerBtn.classList.toggle('active');
  colorPicker.classList.toggle('active');

  squares.forEach((square) => {
    if (isRainbowPickerActive) {
      square.addEventListener('mousedown', () => (isDrawing = true));
      square.addEventListener('mouseup', () => (isDrawing = false));
      square.addEventListener('mouseenter', () => {
        if (isDrawing) {
          square.style.backgroundColor = getRandomRainbowColor();
        }
      });
    } else {
      square.removeEventListener('mousedown', () => (isDrawing = true));
      square.removeEventListener('mouseup', () => (isDrawing = false));
      square.removeEventListener('mouseenter', () => {}); // Empty function to remove event listener for mouseenter event when rainbow picker is not active
    }
  });
}
// Function to generate random rainbow color
function getRandomRainbowColor() {
  const hue = Math.floor(Math.random() * 361); // Generate a random hue value between 0 and 360
  const saturation = '80%';
  const lightness = '60%';
  const alpha = '1'; // Set the alpha value to 1
  return `hsl(${hue}, ${saturation}, ${lightness}, ${alpha})`;
}

// Select the header and footer elements
const header = document.querySelector('header');
const footer = document.querySelector('footer');

// Create the header content
const headerContent = document.createElement('h1');
headerContent.textContent = 'Etch a Sketch';

// Create the footer content
const footerContent = document.createElement('p');
footerContent.textContent = 'Copyright © ' + new Date().getFullYear() + ' Andriel José.';

// Create a link to the github user
const githubLink = document.createElement('a');
githubLink.href = 'https://github.com/andriel300';
githubLink.style.display = 'flex';
githubLink.style.justifyContent = 'center';
githubLink.style.alignItems = 'center';

const githubImg = document.createElement('img');
githubImg.src = '/github-character.png';
githubImg.alt = 'Github Logo';
githubImg.style.width = '32px';
githubImg.style.height = '32px';
githubImg.style.display = 'block';

// Add the hover effect to the github image
githubImg.addEventListener('mouseover', () => {
  githubImg.style.opacity = 0.5;
});

githubImg.addEventListener('mouseout', () => {
  githubImg.style.opacity = 1;
});

// append the header and footer content to the DOM
header.appendChild(headerContent);
footer.appendChild(footerContent);
footer.appendChild(githubLink);
githubLink.appendChild(githubImg);
