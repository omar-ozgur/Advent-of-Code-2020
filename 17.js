// https://adventofcode.com/2020/day/17

import * as fs from "fs";

const dataBuffer = fs.readFileSync("17.txt");
const dataString = dataBuffer.toString();
const dataLines = dataString.split(/\r?\n/);

const getAnswer1 = () => {
  const active = new Set();

  for (let x = 0; x < dataLines.length; x++) {
    for (let y = 0; y < dataLines[x].length; y++) {
      if (dataLines[x][y] === "#") {
        active.add([x, y, 0].toString());
      }
    }
  }

  for (let i = 0; i < 6; i++) {
    const counts = {};

    for (const activeCoord of active.values()) {
      const [x, y, z] = activeCoord.split(",").map(Number);
      for (let x2 = x - 1; x2 <= x + 1; x2++) {
        for (let y2 = y - 1; y2 <= y + 1; y2++) {
          for (let z2 = z - 1; z2 <= z + 1; z2++) {
            const coord = [x2, y2, z2].toString();

            if (x2 === x && y2 === y && z2 === z) {
              if (!(coord in counts)) {
                counts[coord] = 0;
              }
              continue;
            }

            if (coord in counts) {
              counts[coord]++;
            } else {
              counts[coord] = 1;
            }
          }
        }
      }
    }

    for (const [coord, count] of Object.entries(counts)) {
      if (count === 3 && !active.has(coord)) {
        active.add(coord);
      } else if (count !== 2 && count !== 3 && active.has(coord)) {
        active.delete(coord);
      }
    }
  }

  return active.size;
};

const getAnswer2 = () => {
  const active = new Set();

  for (let x = 0; x < dataLines.length; x++) {
    for (let y = 0; y < dataLines[x].length; y++) {
      if (dataLines[x][y] === "#") {
        active.add([x, y, 0, 0].toString());
      }
    }
  }

  for (let i = 0; i < 6; i++) {
    const counts = {};

    for (const activeCoord of active.values()) {
      const [x, y, z, w] = activeCoord.split(",").map(Number);
      for (let x2 = x - 1; x2 <= x + 1; x2++) {
        for (let y2 = y - 1; y2 <= y + 1; y2++) {
          for (let z2 = z - 1; z2 <= z + 1; z2++) {
            for (let w2 = w - 1; w2 <= w + 1; w2++) {
              const coord = [x2, y2, z2, w2].toString();

              if (x2 === x && y2 === y && z2 === z && w2 === w) {
                if (!(coord in counts)) {
                  counts[coord] = 0;
                }
                continue;
              }

              if (coord in counts) {
                counts[coord]++;
              } else {
                counts[coord] = 1;
              }
            }
          }
        }
      }
    }

    for (const [coord, count] of Object.entries(counts)) {
      if (count === 3 && !active.has(coord)) {
        active.add(coord);
      } else if (count !== 2 && count !== 3 && active.has(coord)) {
        active.delete(coord);
      }
    }
  }

  return active.size;
};

// Part 1
console.log(getAnswer1());

// Part 2
console.log(getAnswer2());
