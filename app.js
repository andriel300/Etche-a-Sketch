const grid = document.querySelector('.grid');

// Create div rows, columns.
const createGrid = () => {
  for (let i = 0; i < 256; i++) {
    const square = document.createElement('div');
    square.addEventListener('mouseover', () => {
      square.style.backgroundColor = 'black';
    });
    grid.appendChild(square);
  }

  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = 'repeat(16, 1fr)';
  grid.style.gridTemplateRows = 'repeat(16, 1fr)';

  // Slider
  const slider = document.getElementById('myRange');
  const output = document.getElementById('outputValue');
  output.innerHTML = slider.value;

  slider.oninput = function () {
    output.innerHTML = this.value;
  };
};

createGrid();
