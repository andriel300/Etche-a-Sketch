const grid = document.querySelector('.grid');

const createGrid = () => {
  for (let i = 0; i < 16 * 16; i++) {
    const square = document.createElement('div');
    square.addEventListener('mouseover', () => {
      square.style.backgroundColor = 'black';
    });
    grid.appendChild(square);
  }

  container.style.display = 'grid';
  container.style.gridTemplateColumns = 'repeat(16, 1fr)';
  container.style.gridTemplateRows = 'repeat(16, 1fr)';
};

createGrid();
