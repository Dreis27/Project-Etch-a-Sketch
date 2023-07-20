function generateGrid() {
    const container = document.querySelector('.grid-container');
    container.innerHTML = ''; // Clear any previous grid

    const n = document.getElementById('gridSize').value || 10;

    // Set CSS grid properties based on input
    container.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${n}, 1fr)`;

    for (let i = 0; i < n * n; i++) {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
        container.appendChild(gridItem);
    }
}

window.onload = function() {
    generateGrid();
}