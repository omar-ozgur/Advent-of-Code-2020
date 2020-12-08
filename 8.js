// https://adventofcode.com/2020/day/8

import * as fs from "fs";

const dataBuffer = fs.readFileSync("8.txt");
const dataString = dataBuffer.toString();
const dataLines = dataString.split(/\r?\n/);

const getProgramValue = (lines, canLoop) => {
  let accumulator = 0;
  const seen = {};

  for (let i = 0; i < lines.length; i++) {
    if (i in seen) {
      return canLoop ? accumulator : null;
    }

    seen[i] = true;

    let [instruction, value] = lines[i].split(" ");
    value = Number(value);

    if (instruction === "acc") {
      accumulator += value;
    } else if (instruction === "jmp") {
      i += value - 1;
    }
  }

  return accumulator;
};

const getFixedProgramValue = (lines) => {
  for (let i = 0; i < dataLines.length; i++) {
    const [instruction, value] = dataLines[i].split(" ");

    if (instruction === "jmp" || instruction === "nop") {
      const modifiedLines = [...dataLines];
      modifiedLines[i] = `${instruction === "jmp" ? "nop" : "jmp"} ${value}`;

      const programValue = getProgramValue(modifiedLines, false);
      if (programValue !== null) {
        return programValue;
      }
    }
  }
};

// Part 1
console.log(getProgramValue(dataLines, true));

// Part 2
console.log(getFixedProgramValue(dataLines));
