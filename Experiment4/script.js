const svg = document.getElementById('canvas');
let drawings = [];

svg.addEventListener('mousedown', (e) => {
    const color = document.getElementById('colorPicker').value;
    const size = document.getElementById('sizeRange').value;

    // Create circle element
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", e.offsetX);
    circle.setAttribute("cy", e.offsetY);
    circle.setAttribute("r", size);
    circle.setAttribute("fill", color);

    svg.appendChild(circle);
    drawings.push(circle);
});

// Undo last circle
function undo() {
    const last = drawings.pop();
    if (last) {
        svg.removeChild(last);
    }
}

// Clear all drawings
function clearAll() {
    drawings.forEach(el => svg.removeChild(el));
    drawings = [];
}
