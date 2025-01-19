/* 
Creates a grid with the default (16x16) size.
Each mouse move on a cell leaves a trail on it.
Trail has default darkening effect which each mouse move on a cell adds 10% opacity.
Rainbow mode can be activated. That mode randomizes the trail color for each mouse move.  
*/
const rows = []; 
const cells = [];
const container = document.querySelector(".container");
const resetButton = document.querySelector("#reset");
const resizeButton = document.querySelector("#resize");
const rainbowButton = document.querySelector("#rainbow");

// Default 16x16 grid size
createGrid(16);

resetButton.addEventListener("click", () => resetTrail());
resizeButton.addEventListener("click", () => resizeGrid());
rainbowButton.addEventListener("click", () => toggleRainbow());


function getRandomValue(limit) {
  return Math.floor(Math.random() * limit);
}


function drawTrail(cell) {
  setColor(cell);
}


function getBackgroundRGBA(cell) {
  return cell.style.backgroundColor.slice(5, -1).split(",").map(value => Number(value.trim()));
}


function setColor(cell) {
  if (cell.style.backgroundColor === "") {
    if (rainbowButton.classList.contains("active")) {
      cell.style.backgroundColor = `rgba(${getRandomValue(256)}, ${getRandomValue(256)}, ${getRandomValue(256)}, 0.1)`;
    } else {
      cell.style.backgroundColor = `rgba(21, 26, 37, 0.1)`;
    }
  } else {
    const rgbaValues = getBackgroundRGBA(cell);
    cell.style.backgroundColor = `rgba(${rgbaValues[0]}, ${rgbaValues[1]}, ${rgbaValues[2]}, ${rgbaValues[3] < 1 ? (rgbaValues[3] + 0.1) : rgbaValues[3]})`;
  }
}


function resetTrail() {
  cells.forEach((cell) => {
    cell.style.backgroundColor = "";
    cell.style.opacity = "";
  });
}


function toggleRainbow() {
  rainbowButton.classList.toggle("active");
}


function createGrid(gridSize) {
  const containerSize = getContainerSize();
  const cellSize = computeCellSize(containerSize[0], containerSize[1], gridSize);
  createRow(gridSize);
  rows.forEach((row) => {
    createCell(gridSize, row, cellSize);
  });

  // Event listener for each cell in the grid
  cells.forEach((cell) => {
    cell.addEventListener("mouseout", () => drawTrail(cell));
  });
}


function createRow(gridSize) {
  for (let i = 0; i < gridSize; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    row.id = `${i}`;
    rows.push(row);
    container.appendChild(row);
  }
}


function createCell(gridSize, row, cellSize) {
  for (let i = 0; i < gridSize; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.id = `cell_${row.id}-${i}`;
    cell.style.width = `${cellSize[0]}px`;
    cell.style.height = `${cellSize[1]}px`;
    cells.push(cell);
    row.appendChild(cell);
  }
}

// Deletes the current grid and creates the new one
function resizeGrid() {
  container.innerHTML = "";
  rows.length = 0;
  cells.length = 0;
  const gridSize = getNewGridSize();
  createGrid(gridSize);
}


function getNewGridSize() {
  let gridSize;
  do {
    gridSize = Number(prompt("Enter the new grid size."));
  }
  while (isNaN(gridSize) || gridSize < 1);
  if (gridSize > 100) {
    gridSize = 100;
    alert("Maximum row and column size is 100!\nSetting the row and column size to 100.");
  }
  return gridSize;
}


function getContainerSize() {
  const width = window.getComputedStyle(container).getPropertyValue("width").slice(0, -2);
  const height = window.getComputedStyle(container).getPropertyValue("height").slice(0, -2);
  return [width, height];
}


function computeCellSize(containerWidth, containerHeight, gridSize) {
  const padding = window.getComputedStyle(container).getPropertyValue("padding").slice(0, -2);
  const gap = window.getComputedStyle(container).getPropertyValue("gap").slice(0, -2);
  const border = window.getComputedStyle(container).getPropertyValue("border-width").slice(0, -2);
  const cellWidth = (containerWidth - (2 * border) - (2 * padding) - ((gridSize - 1) * gap)) / gridSize; 
  const cellHeight = (containerHeight - (2 * border) - (2 * padding) - ((gridSize - 1) * gap)) / gridSize; 
  return [cellWidth, cellHeight];
}
