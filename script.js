

const colorBtn = document.getElementById('colorBtn');
const eraseBtn = document.getElementById('eraseBtn');
const clearBtn = document.getElementById('clearBtn');
const rainbowBtn = document.getElementById('rainbowBtn');
const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('sizeSlider');

let drawingMode = 'normal'; 


  

function generateGrid() {
    const container = document.querySelector('.grid-container');
    container.innerHTML = ''; // Clear any previous grid

    const n = document.getElementById('sizeSlider').value || 16;

    // Set CSS grid properties based on input
    container.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${n}, 1fr)`;

    for (let i = 0; i < n * n; i++) {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';

        // Handle the mouse movement when button is pressed
        gridItem.addEventListener('mousemove', function(e) {
                if (drawingMode === 'erase') {
                    gridItem.style.backgroundColor = 'white';
                } else if (drawingMode === 'rainbow') {
                    gridItem.style.backgroundColor = getRandomColor();
                } else {
                    gridItem.style.backgroundColor = 'blue'; // default color for 'normal' mode
                }
            
        });
        


        container.appendChild(gridItem);
    }
}

function clearGrid() {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.style.backgroundColor = 'white'; // Original color or whatever color you want
    });
}


function setDrawingMode(mode) {
    drawingMode = mode;
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}






window.onload = function() {
    generateGrid();
}

console.log(rainbowBtn);

clearBtn.addEventListener('click', clearGrid);

eraseBtn.addEventListener('click', function() {
    setDrawingMode('erase');
});

rainbowBtn.addEventListener('click', function() {
    setDrawingMode('rainbow');
});
