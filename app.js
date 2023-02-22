document.addEventListener('DOMContentLoaded', function () {
  // Get the container div
  const container = document.getElementById('container');

  // Create a 16x16 grid of square divs using nested loop to create rows
  for (let i = 0; i < 16; i++) {
    const row = document.createElement('div');
    row.classList.add('row');

    for (let j = 0; j < 16; j++) {
      const square = document.createElement('div');
      square.classList.add('square');
      row.appendChild(square);
    }
    container.appendChild(row);
  }
});
