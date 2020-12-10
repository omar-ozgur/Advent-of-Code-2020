// https://adventofcode.com/2020/day/10

import * as fs from "fs";

const dataBuffer = fs.readFileSync("10.txt");
const dataString = dataBuffer.toString();
const dataLines = dataString.split(/\r?\n/);

const answer1Helper = (path, adapters, currentAdapter) => {
  if (!(currentAdapter in adapters)) {
    return null;
  }

  if (path.length === Object.keys(adapters).length - 1) {
    let differencesOf1 = 1;
    let differencesOf3 = 1;

    for (let i = 1; i < path.length; i++) {
      if (path[i] - path[i - 1] === 1) {
        differencesOf1++;
      }

      if (path[i] - path[i - 1] === 3) {
        differencesOf3++;
      }
    }

    return differencesOf1 * differencesOf3;
  }

  const childAdapters = adapters[currentAdapter];
  for (const childAdapter of childAdapters) {
    const result = answer1Helper(
      [...path, currentAdapter],
      adapters,
      childAdapter
    );
    if (result != null) {
      return result;
    }
  }
};

const getAnswer1 = () => {
  const adapters = {};
  const nums = [0, ...dataLines.map((line) => parseInt(line))];

  for (const num of nums) {
    adapters[num] = [num + 1, num + 2, num + 3];
  }

  return answer1Helper([], adapters, 0);
};

const answer2Helper = (path, adapters, currentAdapter, seen) => {
  if (!(currentAdapter in adapters)) {
    return null;
  } else if (currentAdapter in seen) {
    return seen[currentAdapter];
  }

  let result = 0;

  if (path[path.length - 1] === 140) {
    seen[currentAdapter] = 1;
    return 1;
  }

  const adapter = adapters[currentAdapter];
  for (const childAdapter of adapter) {
    result += answer2Helper(
      [...path, currentAdapter],
      adapters,
      childAdapter,
      seen
    );
  }

  seen[currentAdapter] = result;
  return result;
};

const getAnswer2 = () => {
  const adapters = {};
  let nums = [0, ...dataLines.map((line) => parseInt(line))];
  nums = [...nums, Math.max(...nums) + 3];

  for (const num of nums) {
    adapters[num] = [num + 1, num + 2, num + 3];
  }

  return answer2Helper([], adapters, 0, {});
};

// Part 1
console.log(getAnswer1());

// Part 2
console.log(getAnswer2());
