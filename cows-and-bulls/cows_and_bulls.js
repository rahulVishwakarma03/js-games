function generateDigits() {
  const actualDigits = [];

  for (let index = 0; index < 4; index++) {
    const n = Math.floor(Math.random() * 10);
    actualDigits.push(n);
  }

  return actualDigits;
}

function isValidDigits(digits) {

  if (digits.length > 4) {
    return false;
  }
  for (let index = 0; index < digits.length; index++) {
    if (digits[index] < 0 || digits[index] > 9) {
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

  const digits = stringToArrayOfDigits(stringOfDigits);


  // if(!isValidDigits(digits)){
  //   console.log("Enter 4 valid digit between 0 and 9!");
  //   userInput();
  // }

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

function play(leftMoves) {
  const actualDigits = generateDigits();

  while (leftMoves !== 0) {
    const assumedDigits = userInput();
    if (isWinner(assumedDigits, actualDigits)) {
      console.log("Congratulation, You Won!");
      return;
    }

    const cowsAndBulls = getCowsAndBulls(actualDigits, assumedDigits);
    console.log(`cows = ${cowsAndBulls[0]}`);
    console.log(`Bulls = ${cowsAndBulls[1]}\n`);

    leftMoves--;
  }

  console.log("You Lose!");
  return;
}

function main() {
  play(10);
}
main();
