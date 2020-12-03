// https://adventofcode.com/2020/day/3

import * as fs from "fs";

const dataBuffer = fs.readFileSync("3.txt");
const dataString = dataBuffer.toString();
const dataLines = dataString.split(/\r?\n/);

const getNumberOfTrees = (right, down, dataLines) => {
  const rows = dataLines.map((row) => row.split(""));

  let col = right;
  let total = 0;

  for (let i = down; i < rows.length; i += down) {
    const row = rows[i];

    if (row[col % row.length] === "#") {
      total++;
    }

    col += right;
  }

  return total;
};

const getTreesProduct = (slopes, dataLines) => {
  const numbersOfTrees = slopes.map(([right, down]) =>
    getNumberOfTrees(right, down, dataLines)
  );

  return numbersOfTrees.reduce((product, value) => product * value);
};

// Part 1
console.log(getNumberOfTrees(3, 1, dataLines));

// Part 2
console.log(
  getTreesProduct(
    [
      [1, 1],
      [3, 1],
      [5, 1],
      [7, 1],
      [1, 2],
    ],
    dataLines
  )
);
