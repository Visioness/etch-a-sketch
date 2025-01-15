const container = document.querySelector(".container");
const rows = []; 
const cells = [];

createGrid(16, 16);

function createGrid(rowSize, columnSize) {
  createRow(rowSize);
  rows.forEach((row) => {
    createCell(columnSize, row);
  });
}

function createRow(size) {
  for (let i = 0; i < size; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    row.id = `${i}`;
    rows.push(row);
    container.appendChild(row);
  }
}

function createCell(size, row) {
  for (let i = 0; i < size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.id = `${row.id}-${i}`;
    cells.push(cell);
    row.appendChild(cell);
  }
}