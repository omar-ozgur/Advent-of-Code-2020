// https://adventofcode.com/2020/day/13

import * as fs from "fs";

const dataBuffer = fs.readFileSync("13.txt");
const dataString = dataBuffer.toString();
const dataLines = dataString.split(/\r?\n/);

const getAnswer1 = () => {
  const earliestTime = parseInt(dataLines[0]);
  const ids = dataLines[1].split(",");

  let firstBusId = null;
  let firstBusTime = Infinity;
  for (const id of ids) {
    if (id === "x") {
      continue;
    }

    const originalBusTime = parseInt(id);
    let time = 0;
    do {
      time += originalBusTime;
    } while (time < earliestTime);

    if (time < firstBusTime) {
      firstBusId = originalBusTime;
      firstBusTime = time;
    }
  }
  return firstBusId * (firstBusTime - earliestTime);
};

const getAnswer2 = () => {
  const ids = dataLines[1].split(",");

  let time = 0;
  let modifier = 1;
  for (let i = 0; i < ids.length; i++) {
    if (ids[i] == "x") {
      continue;
    }

    if ((time + i) % ids[i] == 0) {
      modifier *= ids[i];
    } else {
      time += modifier;
      i--;
    }
  }

  return time;
};

// Part 1
console.log(getAnswer1());

// Part 2
console.log(getAnswer2());
