function generateDigits() {
  const actualDigits = [];

  for (let index = 0; index < 4; index++) {
    const n = Math.floor(Math.random() * 10);
    actualDigits.push(n);
  }

  return actualDigits;
}

function isValidDigits(digits) {
  const validDigits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  if (digits.length > 4) {
    return false;
  }
  for (let index = 0; index < digits.length; index++) {
    if (!validDigits.includes(digits[index])) {
      return false;
    }
  }
  return true;
}

function stringToArrayOfDigits(string) {
  const digits = [];
  for (let index = 0; index < string.length; index++) {
    digits.push(parseInt(string[index]));
  }

  return digits;
}

function userInput() {

  const stringOfDigits = (prompt("Enter 4 digit : "));

  let digits = stringToArrayOfDigits(stringOfDigits);
  console.log(digits);

  if (!isValidDigits(digits)) {
    console.log("\n-----Enter 4 valid digit between 0 and 9!-----\n");
    digits = userInput();
  }

  return digits;
}

function copyOfArray(array) {
  const copy = [];

  for (let index = 0; index < array.length; index++) {
    copy.push(array[index]);
  }
  return copy;
}

function getCowsAndBulls(assumed, actual) {
  const copyOfAcutal = copyOfArray(actual);
  let bulls = 0;

  for (let index = 0; index < copyOfAcutal.length; index++) {
    if (assumed[index] === copyOfAcutal[index]) {
      copyOfAcutal[index] = -1;
      bulls++;
    }
  }

  let cows = 0;
  for (let index = 0; index < copyOfAcutal.length; index++) {
    cows += copyOfAcutal.includes(assumed[index]) ? 1 : 0;
  }

  return [cows, bulls];
}

function isWinner(assumed, actual) {
  for (let index = 0; index < actual.length; index++) {
    if (actual[index] !== assumed[index]) {
      return false;
    }
  }

  return true;
}

function displayMessage(inputedDigits, cowsAndBulls, leftMoves) {
  console.log(`  Cows | Bulls | Digits `);
  console.log(`-------|-------|--------`);
  for (let index = 0; index < inputedDigits.length; index++) {
    console.log(`   ${cowsAndBulls[index][0]}   |   ${cowsAndBulls[index][1]}   | ${inputedDigits[index]} `);
  }
  console.log("\n\n");
}

function play(leftMoves) {
  const actualDigits = generateDigits();
  const inputedDigits = [];
  const cowsAndBulls = [];

  while (leftMoves !== 0) {
    const assumedDigits = userInput();
    inputedDigits.push(assumedDigits);
    if (isWinner(assumedDigits, actualDigits)) {
      console.log("Congratulation, You Won!");
      return;
    }

    cowsAndBulls.push(getCowsAndBulls(actualDigits, assumedDigits));
    console.clear();
    displayMessage(inputedDigits, cowsAndBulls, leftMoves);

    leftMoves--;
  }

  console.log("You Lose!");
  console.log(`Actual digits is ${actualDigits}`);
  return;
}

function main() {
  play(10);
}
main();
