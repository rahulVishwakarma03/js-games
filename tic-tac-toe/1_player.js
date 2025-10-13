function formatRow(row) {
  return row.join(" | ");
}
function makeGrid(array) {
  const grid = [];
  grid.push(formatRow(array[0]));
  grid.push(["---------"]);
  grid.push(formatRow(array[1]));
  grid.push(["---------"]);
  grid.push(formatRow(array[2]));

  return grid.join("\n");
}

function areFilledCoordinates(r, c, grid) {
  return grid[r][c] !== " ";
}
function areNumber(r, c) {
  return typeof r === "number" && typeof c === "number";
}
function isInRange(number, start = 0, end = 2) {
  return number >= start && number <= end;
}

function areInvalidCoordinates(r, c, grid) {
  if (!areNumber(r, c) || !isInRange(r) || !isInRange(c)) {
    return "---Please enter coordinates between 0 and 2 and separate it by space!---";
  }

  if (areFilledCoordinates(r, c, grid)) {
    return "\n ----Already Filled! Try another!----\n"
  }

  return false;
}

function userInput(player, grid) {
  console.log(`\n----Player (${player})----\n`);
  const coordinates = prompt("Enter Coordinates : ").split(" ");
  const r = parseInt(coordinates[0]);
  const c = parseInt(coordinates[1]);

  if (areInvalidCoordinates(r, c, grid)) {
    console.log(areInvalidCoordinates(r, c, grid));
    return userInput(player, grid);
  }

  return [r, c];
}

function computerInput(grid) {
  const r = Math.floor(Math.random() * 3);
  const c = Math.floor(Math.random() * 3);

  if (areFilledCoordinates(r, c, grid)) {
    return computerInput(grid);
  }
  return [r, c];
}

function modifiedGrid(grid, coordinates, player) {
  const players = ['O', 'X'];
  const r = coordinates[0];
  const c = coordinates[1];
  grid[r][c] = players[(player + 1) / 2];
  return grid;
}

function playAgain() {
  const confirmation = confirm("Do you want to play again? ");
  if (confirmation) {
    console.clear();
    main();
  }
  return;
}

function winningPattern() {
  const pattern = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]];

  return pattern;
}

function hasWon(grid) {
  const winPattern = winningPattern();

  for (let i = 0; i < winPattern.length; i++) {
    const result = [];

    for (let j = 0; j < winPattern[i].length; j++) {
      const r = winPattern[i][j][0];
      const c = winPattern[i][j][1];
      result.push(grid[r][c]);
    }

    if (!result.includes(" ") && (result[0] === result[1] && result[1] === result[2])) {
      return true;
    }

  }
  return false;
}

function copyGrid(grid) {
  const copyOfGrid = [[], [], []];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      copyOfGrid[i][j] = grid[i][j];
    }
  }
  return copyOfGrid;
}

function predictedResult(grid, player, leftMoves) {
  if (hasWon(grid)) {
    return player * (-1);
  }
  if (leftMoves === 0) {
    return 0;
  }

  const possibleResults = [];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const copyOfGrid = copyGrid(grid);
      if (copyOfGrid[i][j] === " ") {
        copyOfGrid[i][j] = currentTurn(player);
        const result = predictedResult(copyOfGrid, player * (-1), leftMoves - 1);
        possibleResults.push(parseInt(result));
      }
    }
  }
  return possibleResults;
}

function currentTurn(player) {
  return player === -1 ? "O" : "X";
}

function nextCoordinatesForMax(grid, possibleResults) {
  let max = -Infinity;
  let coordinates = [];
  let count = 0;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (grid[r][c] === " ") {

        if (max < possibleResults[count]) {
          max = possibleResults[count];
          coordinates = [r, c];
        }
        count++;

      }
    }
  }
  return coordinates;
}

function nextCoordinatesForMin(grid, possibleResults) {
  let min = Infinity;
  let coordinates = [];
  let count = 0
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (grid[r][c] === " ") {

        if (min > possibleResults[count]) {
          min = possibleResults[count];
          coordinates = [r, c];
        }
        count++;
      }
    }
  }

  return coordinates;
}

function nextCoordinates(grid, player, leftMoves) {
  const copyOfGrid = copyGrid(grid);
  const possibleResults = predictedResult(copyOfGrid, player, leftMoves);

  // console.log(possibleResults);

  if (player === 1) {
    return nextCoordinatesForMax(grid, possibleResults);
  }

  if (player === -1) {
    return nextCoordinatesForMin(grid, possibleResults);
  }

  // return possibleResults;
}

function play(grid, currentPlayer, leftMoves) {
  console.log(makeGrid(grid));

  while (leftMoves !== 0) {
    const coordinates = currentPlayer === -1 ? userInput(currentPlayer, grid) : nextCoordinates(copyGrid(grid), currentPlayer, leftMoves);
    console.clear();
    // console.log(coordinates);
    grid = modifiedGrid(grid, coordinates, currentPlayer);
    // console.log(grid);
    console.log(makeGrid(grid));

    if (hasWon(grid)) {
      console.log(`Congratulations! Player ${currentPlayer} Won!🏆`);
      playAgain();
      return;
    }
    currentPlayer = currentPlayer * (-1);
    leftMoves--;
  }

  console.log("Game Over!", "❌");
  playAgain();
  return;
}

function main() {
  let currentPlayer = -1;
  // let grid = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]];
  const message = "\n --Note : Coordinates must be between 0 and 2 and must be separated by only 1 space! \n --Example : 0 2 \n"
  // console.log(message);
  // play(grid, currentPlayer, 9);

  let grid = [["X", "O", " "], [" ", "O", " "], [" ", " ", " "]];
  console.log(nextCoordinates(grid, 1, 6));
}
main();
