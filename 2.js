// https://adventofcode.com/2020/day/2

import * as fs from 'fs';

const dataBuffer = fs.readFileSync('2.txt');
const dataString = dataBuffer.toString();
const dataLines = dataString.split(/\r?\n/);

const getLinesData = lines => lines.map(line => {
  const [range, target, password] = line.split(' ');
  const [min, max] = range.split('-');
  const targetLetter = target[0];

  return {
    min,
    max,
    targetLetter,
    password,
  };
});

const getValidPasswords1 = linesData => {
  let total = 0;

  for (const {min, max, targetLetter, password} of linesData) {
    let matchCount = 0;

    for (const letter of password) {
      if (letter === targetLetter) {
        matchCount++;
      }
    }

    if (matchCount >= min && matchCount <= max) {
      total++;
    }
  }


  return total;
};

const getValidPasswords2 = () => {
  let total = 0;

  for (const {min, max, targetLetter, password} of linesData) {
    let matchCount = 0;

    const firstLetter = password[min - 1];
    const secondLetter = password[max - 1];

    if ((firstLetter === targetLetter && secondLetter !== targetLetter) || (firstLetter !== targetLetter && secondLetter === targetLetter)) {
      total++;
    }
  }


  return total;
};

const linesData = getLinesData(dataLines);

// Part 1
console.log(getValidPasswords1(linesData));

// Part 2
console.log(getValidPasswords2(linesData));
