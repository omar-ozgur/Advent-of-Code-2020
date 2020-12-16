// https://adventofcode.com/2020/day/16

import * as fs from "fs";

const dataBuffer = fs.readFileSync("16.txt");
const dataString = dataBuffer.toString();
const dataLines = dataString.split(/\r?\n/);

const sumOfInvalidFields = (ticket, fieldRanges) =>
  ticket.reduce((total, value) => {
    for (const [range1, range2] of Object.values(fieldRanges)) {
      if (
        (value >= range1[0] && value <= range1[1]) ||
        (value >= range2[0] && value <= range2[1])
      ) {
        return total;
      }
    }
    return total + value;
  }, 0);

const getAnswer1 = ({ fieldRanges, nearbyTickets }) => {
  const fields = Object.keys(fieldRanges);
  return nearbyTickets.reduce(
    (total, ticket) => sumOfInvalidFields(ticket, fieldRanges) + total,
    0
  );
};

const getAnswer2 = ({ fieldRanges, yourTicket, nearbyTickets }) => {
  const ticketValues = new Array(yourTicket.length).fill(null).map(() => []);
  const tickets = [yourTicket, ...nearbyTickets].filter((ticket) =>
    ticket.every((value) =>
      Object.values(fieldRanges).some((ranges) =>
        ranges.some(([start, end]) => value >= start && value <= end)
      )
    )
  );

  for (let i = 0; i < yourTicket.length; i++) {
    for (const ticket of tickets) {
      ticketValues[i].push(ticket[i]);
    }
  }

  let possibleFields = new Array(yourTicket.length).fill(null).map(() => []);

  for (let i = 0; i < ticketValues.length; i++) {
    const values = ticketValues[i];
    for (const [field, [range1, range2]] of Object.entries(fieldRanges)) {
      let valid = true;
      for (const value of values) {
        if (
          !(
            (value >= range1[0] && value <= range1[1]) ||
            (value >= range2[0] && value <= range2[1])
          )
        ) {
          valid = false;
          break;
        }
      }
      if (valid) {
        possibleFields[i].push(field);
      }
    }
  }

  const seen = new Set();
  for (let i = 1; i <= Object.keys(fieldRanges).length; i++) {
    for (let j = 0; j < possibleFields.length; j++) {
      if (possibleFields[j].length !== i) {
        continue;
      }

      const unseen = possibleFields[j].filter((field) => !(field in seen));
      if (unseen.length === 1) {
        seen[unseen[0]] = true;
        possibleFields[j] = unseen;
      }
    }
  }

  return possibleFields.reduce(
    (total, [field], i) =>
      field.startsWith("departure") ? total * yourTicket[i] : total,
    1
  );
};

const data = (() => {
  const fieldRanges = {};
  let yourTicket = [];
  const nearbyTickets = [];

  let mode = 0;
  for (let i = 0; i < dataLines.length; i++) {
    const line = dataLines[i];

    if (line === "") {
      mode++;
      i++;
      continue;
    }

    if (mode === 0) {
      const field = line.slice(0, line.indexOf(":"));
      const words = line.split(" ");
      let ranges = [words[words.length - 3], words[words.length - 1]];
      ranges = ranges.map((range) => {
        const [numString1, numString2] = range.split("-");
        return [parseInt(numString1), parseInt(numString2)];
      });
      fieldRanges[field] = ranges;
    } else if (mode === 1) {
      yourTicket = line.split(",").map((numString) => parseInt(numString));
    } else {
      const ticket = line.split(",").map((numString) => parseInt(numString));
      nearbyTickets.push(ticket);
    }
  }

  return {
    fieldRanges,
    yourTicket,
    nearbyTickets,
  };
})();

// Part 1
console.log(getAnswer1(data));

// Part 2
console.log(getAnswer2(data));
