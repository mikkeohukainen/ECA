// Based on:
// Wolfram Elementary CA
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/challenges/179-wolfram-ca
// https://youtu.be/Ggxt06qSAe4

// Global Variables
let cells = [];
let ruleValue = 30;
let ruleSet;
let cellWidth = 4;
let currentRowY = 0;
let palette = [];
let ruleInput, cellSizeSelect;
let colorChoice = 1;

function setup() {
  createCanvasAndPalette();
  initializeRuleSet();
  initializeCells();
  setupUIElements();
}

function draw() {
  drawCells();
  updateCellsForNextRow();
}

function createCanvasAndPalette() {
  let containerWidth = select("#container").width - 40;
  let cnv = createCanvas(containerWidth, 600);
  cnv.parent("container");
  palette = [
    color(11, 106, 136),
    color(25, 297, 244),
    color(112, 50, 126),
    color(146, 83, 161),
    color(164, 41, 99),
    color(236, 1, 90),
    color(240, 99, 164),
    color(241, 97, 100),
    color(248, 158, 79),
  ];
  background(255);
}

function initializeRuleSet() {
  ruleSet = ruleValue.toString(2).padStart(8, "0");
}

function initializeCells() {
  let totalCells = floor(width / cellWidth);
  cells = new Array(totalCells).fill(0);
  cells[floor(totalCells / 2)] = 1;
}

function setupUIElements() {
  ruleInput = select("#rule");
  cellSizeSelect = select("#list");
  let startButton = select("#start");
  startButton.mousePressed(restartSketch);
}

function drawCells() {
  for (let i = 0; i < cells.length; i++) {
    drawCell(i);
  }
  currentRowY += cellWidth;
}

function drawCell(index) {
  let x = index * cellWidth;
  noStroke();
  if (colorChoice === 2 && cells[index] === 1) {
    fill(random(palette));
  } else {
    fill(255 - cells[index] * 255);
  }
  square(x, currentRowY, cellWidth);
}

function updateCellsForNextRow() {
  let nextCells = cells.map((_, i) => {
    let left = cells[(i - 1 + cells.length) % cells.length];
    let right = cells[(i + 1) % cells.length];
    return calculateState(left, cells[i], right);
  });
  cells = nextCells;
}

function calculateState(left, center, right) {
  let neighborhood = `${left}${center}${right}`;
  let value = 7 - parseInt(neighborhood, 2);
  return parseInt(ruleSet[value]);
}

function restartSketch() {
  colorChoice = parseInt(select('input[name="choice"]:checked').value());
  ruleValue = parseInt(ruleInput.value());

  if (isNaN(ruleValue) || ruleValue < 0 || ruleValue > 255) {
    console.error("Invalid rule value:", ruleValue);
    return;
  }

  initializeRuleSet();
  cellWidth = parseInt(cellSizeSelect.value());
  initializeCells();
  clear();
  background(255);
  currentRowY = 0;
}
