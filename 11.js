// https://adventofcode.com/2020/day/11

import * as fs from "fs";

const dataBuffer = fs.readFileSync("11.txt");
const dataString = dataBuffer.toString();
const dataLines = dataString.split(/\r?\n/);

const DIRECTIONS = [
  [-1, 0],
  [-1, 1],
  [-1, -1],
  [0, 1],
  [0, -1],
  [1, 0],
  [1, 1],
  [1, -1],
];

const getAnswer1 = (seats) => {
  const nextSeats = [...seats.map((line) => [...line])];
  let numChanges = 0;
  let numFullTotal = 0;

  for (let row = 0; row < seats.length; row++) {
    for (let col = 0; col < seats[row].length; col++) {
      const seat = seats[row][col];
      if (seat === ".") {
        continue;
      }

      let numFull = 0;
      for (const [rowOffset, colOffset] of DIRECTIONS) {
        const [referenceRow, referenceCol] = [row + rowOffset, col + colOffset];

        if (
          referenceRow < 0 ||
          referenceRow >= seats.length ||
          referenceCol < 0 ||
          referenceCol >= seats[row].length
        ) {
          continue;
        }

        const referenceSeat = seats[referenceRow][referenceCol];
        if (referenceSeat === "#") {
          numFull++;
        }
      }

      if (seats[row][col] === "L" && numFull === 0) {
        nextSeats[row][col] = "#";
        numFullTotal++;
        numChanges++;
      } else if (seats[row][col] === "#" && numFull >= 4) {
        nextSeats[row][col] = "L";
        numChanges++;
      } else if (seats[row][col] === "#") {
        numFullTotal++;
      }
    }
  }

  if (numChanges > 0) {
    return getAnswer1(nextSeats);
  } else {
    return numFullTotal;
  }
};

const getAnswer2 = (seats) => {
  const nextSeats = [...seats.map((line) => [...line])];
  let numChanges = 0;
  let numFullTotal = 0;

  for (let row = 0; row < seats.length; row++) {
    for (let col = 0; col < seats[row].length; col++) {
      const seat = seats[row][col];
      if (seat === ".") {
        continue;
      }

      let numFull = 0;
      for (const [rowOffset, colOffset] of DIRECTIONS) {
        let [referenceRow, referenceCol] = [row + rowOffset, col + colOffset];

        while (
          referenceRow >= 0 &&
          referenceRow < seats.length &&
          referenceCol >= 0 &&
          referenceCol < seats[row].length &&
          seats[referenceRow][referenceCol] === "."
        ) {
          referenceRow += rowOffset;
          referenceCol += colOffset;
        }

        if (
          referenceRow < 0 ||
          referenceRow >= seats.length ||
          referenceCol < 0 ||
          referenceCol >= seats[row].length
        ) {
          continue;
        }

        const referenceSeat = seats[referenceRow][referenceCol];
        if (referenceSeat === "#") {
          numFull++;
        }
      }

      if (seats[row][col] === "L" && numFull === 0) {
        nextSeats[row][col] = "#";
        numFullTotal++;
        numChanges++;
      } else if (seats[row][col] === "#" && numFull >= 5) {
        nextSeats[row][col] = "L";
        numChanges++;
      } else if (seats[row][col] === "#") {
        numFullTotal++;
      }
    }
  }

  if (numChanges > 0) {
    return getAnswer2(nextSeats);
  } else {
    return numFullTotal;
  }
};

const seats = dataLines.map((line) => line.split(""));

// Part 1
console.log(getAnswer1(seats));

// Part 2
console.log(getAnswer2(seats));
