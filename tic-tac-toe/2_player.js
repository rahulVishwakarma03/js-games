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

  const position = parseInt(prompt("Enter block number : ")) - 1;
  const r = Math.floor(position / 3);
  const c = position % 3;

  if (areInvalidCoordinates(r, c, grid)) {
    console.log(areInvalidCoordinates(r, c, grid));
    return userInput(player, grid);
  }

  return [r, c];
}

function modifiedGrid(grid, coordinates, player) {
  const players = ['O', 'X'];
  const r = coordinates[0];
  const c = coordinates[1];
  grid[r][c] = players[player];
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

function play(grid, currentPlayer, leftMoves) {
  console.log(makeGrid(grid));

  while (leftMoves !== 0) {
    const coordinates = userInput(currentPlayer, grid);
    console.clear();
    grid = modifiedGrid(grid, coordinates, currentPlayer);
    console.log(makeGrid(grid));

    if (hasWon(grid)) {
      console.log("Congratulations! You Won!", "🏆");
      playAgain();
      return;
    }
    currentPlayer = (currentPlayer + 1) % 2;
    leftMoves--;
  }

  console.log("Game Over!", "❌");
  playAgain();
  return;
}

function main() {
  let currentPlayer = 0;
  let grid = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]];
  const message = "\n --Note : Coordinates must be between 0 and 2 and must be separated by only 1 space! \n --Example : 0 2 \n"
  console.log(message);
  play(grid, currentPlayer, 9);
}
main();
