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

  // add an event listener to change the square color when clicked
  square.addEventListener('click', () => {
    square.style.backgroundColor = getRandomRainbowColor();
  });

  // Add event listener to change the square color on left-clicked
  square.addEventListener('mousemove', handleMouseMove);

  // Prevent context menu from showing up on right-click
  square.addEventListener('contextmenu', (event) => {
    event.preventDefault();
  });

  // Function to handle mouse move events on the square
  function handleMouseMove(event) {
    if (event.buttons === 1) {
      if (rainbowPickerBtn.classList.contains('active')) {
        square.style.backgroundColor = getRandomRainbowColor();
      } else {
        square.style.backgroundColor = colorPicker.value;
      }
    } else if (event.buttons === 2) {
      square.style.backgroundColor = 'white';
      square.addEventListener('mousemove', handleRightClick);
    }
  }

  // Function to handle right click events on the square
  function handleRightClick(event) {
    if (event.buttons === 2) {
      square.style.backgroundColor = 'white';
    } else {
      square.removeEventListener('mousemove', handleRightClick);
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
    const square = createSquare();
    addSquareToGrid(square);
  }
};

// Initialize the slider
const slider = document.getElementById('myRange');
const output = document.getElementById('outputValue');
output.innerHTML = size;

// Handle the slider input event
slider.addEventListener('input', (e) => {
  size = e.target.value;
  output.innerHTML = size;

  // Set the size of the squares between 1px and 64px
  const squareSize = Math.min(64, Math.max(1, Math.floor(400 / size))) + 'px';

  // Set the new grid styles with the updated size and square size
  setGridStyles(size);

  // Create the new grid with the updated size of each adjustments slider
  createGrid(size);
});

// Call the function to create the initial grid
createGrid(size);

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

// Buttons settings
const eraseColorsBtn = document.getElementById('erase-colors-btn');
const colorPicker = document.getElementById('color-picker');
const rainbowPickerBtn = document.getElementById('rgb-picker-btn');

// add event listeners to the buttons
colorPicker.addEventListener('input', setBrushColor);
eraseColorsBtn.addEventListener('click', eraseColors);
rainbowPickerBtn.addEventListener('click', rainbowPicker);

// Define the eraseColors function
function eraseColors() {
  const squares = document.querySelectorAll('.grid > div');
  squares.forEach((square) => (square.style.backgroundColor = 'white'));
}

// Define the setBrushColor function
function setBrushColor() {
  // update the color of the brush
  brushColor = colorPicker.value;
}

let brushColor = colorPicker.value; // set initial brush color to the default color picker value

// define the rainbowPicker function
function rainbowPicker() {
  let isDrawing = false;
  const squares = document.querySelectorAll('.grid > div');
  squares.forEach((square) => {
    square.addEventListener('mousedown', () => {
      isDrawing = true;
    });
    square.addEventListener('mouseup', () => {
      isDrawing = false;
    });
    square.addEventListener('mouseenter', () => {
      if (isDrawing && rainbowPickerBtn.classList.contains('active')) {
        square.style.backgroundColor = getRandomRainbowColor();
      }
    });
  });
  rainbowPickerBtn.classList.add('active');
  colorPicker.disabled = true;
}

// function clearPicker() {
//   rainbowPickerBtn.classList.remove('active');
//   colorPicker.disabled = false;
// }

// colorPicker.addEventListener('input', () => {
//   clearPicker(); // deactivate rainbowPickerBtn
// });

// function to generate random rainbow color
const getRandomRainbowColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
