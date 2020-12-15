// https://adventofcode.com/2020/day/15

import * as fs from "fs";

const dataBuffer = fs.readFileSync("15.txt");
const dataString = dataBuffer.toString();
const dataLines = dataString.split(/\r?\n/);

const getAnswer = (nums, target) => {
  let spoken = new Array(target).fill(null).map((_) => []);
  for (let i = 0; i < nums.length; i++) {
    spoken[nums[i]].push(i + 1);
  }

  let lastNum = nums[nums.length - 1];

  for (let i = nums.length + 1; i <= target; i++) {
    if (spoken[lastNum].length > 1) {
      const timesSpoken = spoken[lastNum];
      const newNum =
        timesSpoken[timesSpoken.length - 1] -
        timesSpoken[timesSpoken.length - 2];
      spoken[newNum].push(i);
      lastNum = newNum;
    } else {
      spoken[0].push(i);
      lastNum = 0;
    }
  }

  return lastNum;
};

const nums = dataLines[0].split(",").map((line) => parseInt(line));

// Part 1
console.log(getAnswer(nums, 2020));

// Part 2
console.log(getAnswer(nums, 30000000));
