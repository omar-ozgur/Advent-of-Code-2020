// https://adventofcode.com/2020/day/9

import * as fs from "fs";

const dataBuffer = fs.readFileSync("9.txt");
const dataString = dataBuffer.toString();
const dataLines = dataString.split(/\r?\n/);

const getAnswer1 = (numbers, range) => {
  const seen = {};

  for (let i = range; i < numbers.length; i++) {
    const target = numbers[i];
    let found = false;

    for (let j = i - range; j < i; j++) {
      const number = parseInt(dataLines[j]);
      if (target - number in seen) {
        found = true;
        break;
      }

      seen[number] = true;
    }

    if (!found) {
      return numbers[i];
    }
  }
};

const getAnswer2 = (numbers, target) => {
  for (let start = 0; start < numbers.length; start++) {
    let value = numbers[start];

    for (let end = start + 1; end < numbers.length; end++) {
      value += numbers[end];
      if (value > target) {
        break;
      } else if (value === target) {
        const range = numbers.slice(start, end + 1);
        return Math.min(...range) + Math.max(...range);
      }
    }
  }
};

const numbers = dataLines.map((line) => parseInt(line));

// Part 1
console.log(getAnswer1(numbers, 25));

// Part 2
console.log(getAnswer2(numbers, 144381670));
