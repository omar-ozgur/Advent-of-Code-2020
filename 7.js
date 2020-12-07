// https://adventofcode.com/2020/day/7

import * as fs from "fs";

const dataBuffer = fs.readFileSync("7.txt");
const dataString = dataBuffer.toString();
const dataLines = dataString.split(/\r?\n/);

const getBagExists = (bagName, targetBagName, bagsData) =>
  bagName === targetBagName
    ? true
    : Object.keys(bagsData[bagName]).some((childBagName) =>
        getBagExists(childBagName, targetBagName, bagsData)
      );

const getBagCount = (targetBagName, bagsData) =>
  Object.keys(bagsData[targetBagName]).length === 0
    ? 0
    : Object.keys(bagsData[targetBagName]).reduce(
        (total, childBagName) =>
          total +
          getBagCount(childBagName, bagsData) *
            bagsData[targetBagName][childBagName] +
          bagsData[targetBagName][childBagName],
        0
      );

const getAnswer1 = (bagsData) =>
  Object.keys(bagsData).reduce(
    (total, bagName) =>
      getBagExists(bagName, "shiny gold", bagsData) ? total + 1 : total,
    -1
  );

const getAnswer2 = () => getBagCount("shiny gold", bagsData);

const getBagsData = (dataLines) => {
  const bagsData = {};

  for (const line of dataLines) {
    const words = line.split(" ");
    const parentBagName = words.slice(0, 2).join(" ");
    bagsData[parentBagName] = {};

    for (let i = 4; i < words.length; i += 4) {
      const childBagCount = parseInt(words[i]);
      const childBagName = words[i + 1] + " " + words[i + 2];
      if (childBagName !== "other bags.") {
        bagsData[parentBagName][childBagName] = childBagCount;
      }
    }
  }

  return bagsData;
};

const bagsData = getBagsData(dataLines);

// Part 1
console.log(getAnswer1(bagsData));

// Part 2
console.log(getAnswer2(bagsData));
