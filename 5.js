// https://adventofcode.com/2020/day/5

import * as fs from "fs";

const dataBuffer = fs.readFileSync("5.txt");
const dataString = dataBuffer.toString();
const dataLines = dataString.split(/\r?\n/);

const getRowNum = (rowCode) => {
  let currentRow = 0;
  let numRowsLeft = 127;

  for (const char of rowCode) {
    const halfRows = Math.ceil(numRowsLeft / 2);

    if (char === "B") {
      currentRow += halfRows;
    }

    numRowsLeft -= halfRows;
  }

  return currentRow;
};

const getColNum = (colCode) => {
  let currentCol = 0;
  let numColsLeft = 7;

  for (const char of colCode) {
    const halfCols = Math.ceil(numColsLeft / 2);

    if (char === "R") {
      currentCol += halfCols;
    }

    numColsLeft -= halfCols;
  }

  return currentCol;
};

const getSeatId = (code) => {
  const rowCode = code.slice(0, 7);
  const colCode = code.slice(7, 10);

  return getRowNum(rowCode) * 8 + getColNum(colCode);
};

const sortCodes = (codes) =>
  codes.sort((a, b) => {
    a = a.replace(/F/g, "A");
    b = b.replace(/F/g, "A");

    return a < b ? -1 : a > b ? 1 : 0;
  });

const getHighestSeatId = (codes) =>
  getSeatId(sortCodes(codes)[codes.length - 1]);

const getMySeatId = (codes) => {
  const sortedSeatIds = sortCodes(codes).map(getSeatId);

  for (let i = 1; i < sortedSeatIds.length; i++) {
    if (sortedSeatIds[i] === sortedSeatIds[i - 1] + 2) {
      return sortedSeatIds[i] - 1;
    }
  }
};

// Part 1
console.log(getHighestSeatId(dataLines));

// Part 2
console.log(getMySeatId(dataLines));
