// https://adventofcode.com/2020/day/6

import * as fs from "fs";

const dataBuffer = fs.readFileSync("6.txt");
const dataString = dataBuffer.toString();
const dataLines = dataString.split(/\r?\n/);

const getAnswer1 = () => {
  let result = 0;
  let questionsSeen = {};

  for (const questions of dataLines) {
    if (questions === "") {
      questionsSeen = {};

      continue;
    }

    for (const question of questions) {
      if (!(question in questionsSeen)) {
        questionsSeen[question] = true;
        result++;
      }
    }
  }

  return result;
};

const getAnswer2 = () => {
  let result = 0;
  let peopleInGroup = 0;
  let questionCounts = {};

  for (const questions of dataLines) {
    if (questions === "") {
      for (const question in questionCounts) {
        if (questionCounts[question] === peopleInGroup) {
          result++;
        }
      }

      questionCounts = {};
      peopleInGroup = 0;

      continue;
    }

    peopleInGroup++;

    for (const question of questions) {
      if (!(question in questionCounts)) {
        questionCounts[question] = 1;
      } else {
        questionCounts[question]++;
      }
    }
  }

  return result;
};

// Part 1
console.log(getAnswer1());

// Part 2
console.log(getAnswer2());
