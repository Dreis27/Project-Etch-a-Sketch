

const colorBtn = document.getElementById('colorBtn');
const eraseBtn = document.getElementById('eraseBtn');
const clearBtn = document.getElementById('clearBtn');
const rainbowBtn = document.getElementById('rainbowBtn');
const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('sizeSlider');
const colorPicker = document.getElementById('colorPicker');
const colorDisplay = document.querySelector('.color-display');

let drawingMode = 'normal'; 
let chosenColor = 'black';
let currentSize = undefined;

const buttons = [colorBtn, rainbowBtn, eraseBtn];

function clearSelected() {
    buttons.forEach(btn => btn.classList.remove('selected'));
}
  

function generateGrid() {
    const container = document.querySelector('.grid-container');
    container.innerHTML = ''; // Clear any previous grid

    const n = currentSize || 16;

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
                } else if (drawingMode === 'colorMode') {
                    gridItem.style.backgroundColor = chosenColor; // default color for 'normal' mode
                } else {
                    gridItem.style.backgroundColor = chosenColor; 
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

colorBtn.classList.add('selected');

sizeValue.innerHTML = `${sizeSlider.value} x ${sizeSlider.value}`;

clearBtn.addEventListener('click', clearGrid);

eraseBtn.addEventListener('click', function() {
    setDrawingMode('erase');
    clearSelected();
    eraseBtn.classList.add('selected');
});

rainbowBtn.addEventListener('click', function() {
    setDrawingMode('rainbow');
    clearSelected();
    rainbowBtn.classList.add('selected');
});

colorBtn.addEventListener('click', function(){
    setDrawingMode('colorMode');
    clearSelected();
    colorBtn.classList.add('selected');
});

sizeSlider.oninput = function() {
    sizeValue.innerHTML = `${this.value} x ${this.value}`;
    currentSize = this.value;
    generateGrid();
}

colorDisplay.addEventListener('click', function() {
    colorPicker.click();  // Trigger the color picker when the circle is clicked
});

colorPicker.addEventListener('input', function(event) {
    chosenColor = event.target.value;
    colorDisplay.style.backgroundColor = chosenColor;
    // Optionally, set the drawingMode color to the chosenColor if you want
    // drawingModeColor = chosenColor;
});