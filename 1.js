// https://adventofcode.com/2020/day/1

import * as fs from 'fs';

const dataBuffer = fs.readFileSync('1.txt');
const dataString = dataBuffer.toString();
const dataLines = dataString.split(/\r?\n/);

const getTwoAnswer = (nums, target) => {
  const seen = {};

  for (const num of nums) {
    if (target - num in seen) {
      return num * (target - num);
    }

    seen[num] = num;
  }

  return null;
};

const getThreeAnswer = (nums, target) => {
  for (let i = 0; i < nums.length; i++) {
    const twoSumAnswer = getTwoAnswer(nums.slice(i + 1, nums.length), target - nums[i]);

    if (twoSumAnswer == null) {
      continue;
    }

    return nums[i] * twoSumAnswer;
  }
};

// Part 1
console.log(getTwoAnswer(dataLines, 2020));

// Part 2
console.log(getThreeAnswer(dataLines, 2020));
