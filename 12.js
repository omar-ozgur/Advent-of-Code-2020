// https://adventofcode.com/2020/day/12

import * as fs from "fs";

const dataBuffer = fs.readFileSync("12.txt");
const dataString = dataBuffer.toString();
const dataLines = dataString.split(/\r?\n/);

const DIRECTIONS = {
  E: [1, 0],
  S: [0, -1],
  W: [-1, 0],
  N: [0, 1],
};

const getAnswer1 = () => {
  let row = 0;
  let col = 0;
  let degrees = 0;

  for (const line of dataLines) {
    const instruction = line[0];
    const value = parseInt(line.slice(1));

    if (instruction === "F") {
      const radians = (degrees * Math.PI) / 180;
      row += Math.cos(radians) * value;
      col += Math.sin(radians) * value;
    } else if (instruction === "L") {
      degrees += value;
    } else if (instruction === "R") {
      degrees -= value;
    } else {
      row += DIRECTIONS[instruction][0] * value;
      col += DIRECTIONS[instruction][1] * value;
    }
  }

  return Math.round(Math.abs(row) + Math.abs(col));
};

const getAnswer2 = () => {
  let row = 0;
  let col = 0;
  let waypointRow = 10;
  let waypointCol = 1;

  for (const line of dataLines) {
    const instruction = line[0];
    const value = parseInt(line.slice(1));

    if (instruction === "F") {
      row += waypointRow * value;
      col += waypointCol * value;
    } else if (instruction === "L" || instruction === "R") {
      const radians =
        Math.atan2(waypointCol, waypointRow) +
        (instruction === "L" ? 1 : -1) * ((value * Math.PI) / 180);
      const distance = Math.sqrt(waypointRow ** 2 + waypointCol ** 2);

      waypointRow = Math.cos(radians) * distance;
      waypointCol = Math.sin(radians) * distance;
    } else {
      waypointRow += DIRECTIONS[instruction][0] * value;
      waypointCol += DIRECTIONS[instruction][1] * value;
    }
  }

  return Math.round(Math.abs(row) + Math.abs(col));
};

// Part 1
console.log(getAnswer1());

// Part 2
console.log(getAnswer2());
