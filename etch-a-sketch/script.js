// Container where to store in divs
const container = document.querySelector(".container");

// Variable which determines what drawing mode is on
let drawMode = 'draw';


// Color input
const colorPicker = document.querySelector(".color-picker");
colorPicker.addEventListener('change', () => drawColor = colorPicker.value);

// Color mode button
const colorModeButton = document.querySelector('#colorButton');
colorModeButton.addEventListener('click', () => {
    drawMode = 'draw';
    // colorModeButton.active = true;
    setActiveButton(colorModeButton);
});

// Light brush mode and button
const lightBrushMode = document.querySelector('#lightBrush');
lightBrushMode.addEventListener('click', () => {
    drawMode = 'light';
    setActiveButton(lightBrushMode);
})

// Rainbow button to generate random color when drawing
const randomButton = document.querySelector("#randomButton");
randomButton.addEventListener('click', () => {
    drawMode = 'random';
    setActiveButton(randomButton);
});
// Eraser button
const eraser = document.querySelector('#eraserButton');
eraser.addEventListener('click', () => {
    drawMode = 'eraser';
    setActiveButton(eraser);
})

// Clear button
const clearButton = document.querySelector("#clear");
clearButton.addEventListener('click', () => {
    clear()
});
// Drawing color
let drawColor = colorPicker.value;
// Creating divs based on input
function createDrawingGrid(input) {
    container.innerHTML = "";
    if (input > 100) return alert("Too many!");
    // Set grid rows and columns equal to input value
    container.style.gridTemplateColumns = `repeat(${input}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${input}, 1fr)`;
    
    
    // Create divs into the contaier
    for (let i = 0; i < input * input; i++) {
        const element = document.createElement('div');
        container.appendChild(element);
        element.classList.add('element');
        changeColor(element);
    }
    
}
function getMode(el) {
    // console.log("Hello");
    if (drawMode === 'random') return `rgb(${getRandomRGB()}, ${getRandomRGB()}, ${getRandomRGB()})`;
    else if (drawMode === 'draw') return drawColor;
    else if (drawMode === 'light') return lightMode(el, lightBrushStroke);
    else if (drawMode === 'eraser') return eraserMode(el);
}
function getRandomRGB() {
    return Math.floor((Math.random() * 255))
}

// Light mode coloring function
let lightBrushStroke = 3;
function lightMode(el, stroke) {
    let bgColor = window.getComputedStyle(el).backgroundColor;
    const regex = /\d+/g;
    const arr = bgColor.match(regex);
    const average = arr.reduce((acc, curr) => +acc + +curr) / 3;
    const newVal = Math.floor(average - (((stroke / 255) * 1000) + 3));
    return `rgb(${newVal}, ${newVal}, ${newVal})`;
}
// Function for eraser mode
function eraserMode(el) {
    el.removeAttribute('style');
}

// Function to clear everythin from canvas
function clear() {
    // Get all the elements
    const allElements = document.querySelectorAll('.element');
    // Loop through all elements and remove style tag
    allElements.forEach(el => {
        el.removeAttribute('style');
    });
}

// Add event listeners to draw when mouse is pressed
let mouseDown = false // When mouse is not pressed this is false. When pressed => true
document.addEventListener('mousedown', () => {
    mouseDown = true;
});
document.addEventListener('mouseup', () => {
    mouseDown = false;
});
// Adding event listeners to grid elements
function changeColor(el) {
    // Event listener to draw and drag when mouse is pressed
    el.addEventListener('mouseover', () => {

        mouseDown ? el.style.backgroundColor = getMode(el) : false;

    });
    // Event listener to color in on click
    el.addEventListener('click', () => el.style.backgroundColor = getMode(el));
}



// Slider functions for canvas size
const sizeSlider = document.querySelector("#sizeSlider");
const sizeNumber = document.querySelector("#sizeNumber");

sizeSlider.addEventListener('input', () => {
    const value = sizeSlider.value;

    sizeNumber.value = value;
    sizeSlider.style.backgroundSize = `${value}% 100%`;
});
sizeSlider.addEventListener('change', () => {
    const value = sizeSlider.value;
    createDrawingGrid(value);
})

// Slider functions for light brush
const strSlider = document.querySelector('#strSlider');
const strNumber = document.querySelector('#strNumber');

strSlider.addEventListener('input', () => {
    const value = strSlider.value;

    strNumber.value = value;
    strSlider.style.backgroundSize = `${value*10}% 100%`;
});
strSlider.addEventListener('change', () => {
    const value = strSlider.value;
    lightBrushStroke = value
})
// Function to add .active class to menu items
function setActiveButton(btn) {

    // Shows color picker when color mode is on
    if (btn.id === 'colorButton') colorPicker.style.display = 'block';
    else colorPicker.style.display = 'none';

    // Shows stroke slider when light brush mode is on
    if (btn.id === 'lightBrush') document.querySelector('#lightBrushSlider').style.display = 'block';
    else document.querySelector('#lightBrushSlider').style.display = 'none';

    const currBtn = document.querySelector('.active'); 
    currBtn.classList.remove('active'); //  Removes .active class from currently acive button
    btn.classList.add('active');    // Gives input element an .active class
}

setActiveButton(colorModeButton);
createDrawingGrid(30);