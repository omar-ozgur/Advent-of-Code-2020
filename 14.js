// https://adventofcode.com/2020/day/14

import * as fs from "fs";

const dataBuffer = fs.readFileSync("14.txt");
const dataString = dataBuffer.toString();
const dataLines = dataString.split(/\r?\n/);

const getAnswer1 = () => {
  const data = {};
  let mask = null;

  for (const line of dataLines) {
    let [instruction, _, value] = line.split(" ");
    if (instruction === "mask") {
      mask = value.split("");
    } else {
      const address = parseInt(instruction.slice(4, -1));

      let binaryValue = parseInt(value).toString(2);
      binaryValue = `${"0".repeat(
        36 - binaryValue.length
      )}${binaryValue}`.split("");

      for (let i = 0; i < mask.length; i++) {
        if (mask[i] === "0") {
          binaryValue[i] = "0";
        } else if (mask[i] === "1") {
          binaryValue[i] = "1";
        }
      }

      data[address] = parseInt(binaryValue.join(""), 2);
    }
  }

  return Object.values(data).reduce((total, value) => total + value);
};

const getAnswer2 = () => {
  const data = {};
  let mask = null;

  for (const line of dataLines) {
    let [instruction, _, value] = line.split(" ");
    if (instruction === "mask") {
      mask = value.split("");
    } else {
      const address = parseInt(instruction.slice(4, -1));

      let binaryAddress = address.toString(2);
      binaryAddress = `${"0".repeat(
        36 - binaryAddress.length
      )}${binaryAddress}`.split("");

      let indices = [];
      for (let i = 0; i < mask.length; i++) {
        if (mask[i] === "1") {
          binaryAddress[i] = "1";
        } else if (mask[i] === "X") {
          binaryAddress[i] = "X";
          indices.push(i);
        }
      }

      for (let i = 0; i <= Math.pow(2, indices.length) - 1; i++) {
        let newAddress = [...binaryAddress];
        let possibleValues = i.toString(2);
        possibleValues = `${"0".repeat(
          indices.length - possibleValues.length
        )}${possibleValues}`.split("");

        for (let j = 0; j < indices.length; j++) {
          newAddress[indices[j]] = possibleValues[j];
        }

        data[parseInt(newAddress.join(""), 2)] = parseInt(value);
      }
    }
  }

  return Object.values(data).reduce((total, value) => total + value);
};

// Part 1
console.log(getAnswer1());

// Part 2
console.log(getAnswer2());
