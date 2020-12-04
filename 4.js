// https://adventofcode.com/2020/day/4

import * as fs from "fs";

const dataBuffer = fs.readFileSync("4.txt");
const dataString = dataBuffer.toString();
const dataLines = dataString.split(/\r?\n/);

const getIsValidField = (fieldName, fieldValue, fieldValidators) => {
  if (!(fieldName in fieldValidators)) {
    return true;
  }

  return fieldValidators[fieldName](fieldValue);
};

const getIsValidPassport = (passport, requiredFields, fieldValidators) => {
  for (const requiredField of requiredFields) {
    if (
      !passport.some((field) => {
        const [fieldName, fieldValue] = field.split(":");

        if (fieldName !== requiredField) {
          return false;
        }

        if (
          fieldValidators !== null &&
          !getIsValidField(fieldName, fieldValue, fieldValidators)
        ) {
          return false;
        }

        return true;
      })
    ) {
      return false;
    }
  }

  return true;
};

const getNumberOfValidPassports = (
  requiredFields,
  fieldValidators,
  dataLines
) => {
  const passportRows = [[]];
  for (const dataLine of dataLines) {
    if (dataLine === "") {
      passportRows.push([]);
      continue;
    }

    passportRows[passportRows.length - 1] = passportRows[
      passportRows.length - 1
    ].concat(dataLine.split(" "));
  }

  const validPassports = passportRows.map((passportRow) =>
    getIsValidPassport(passportRow, requiredFields, fieldValidators)
  );

  return validPassports.reduce(
    (total, isValid) => (isValid ? total + 1 : total),
    0
  );
};

const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

const fieldValidators = {
  byr: (value) => /^\d{4}$/.test(value) && value >= 1920 && value <= 2002,
  iyr: (value) => /^\d{4}$/.test(value) && value >= 2010 && value <= 2020,
  eyr: (value) => /^\d{4}$/.test(value) && value >= 2020 && value <= 2030,
  hgt: (value) =>
    (/^\d{3}cm$/.test(value) &&
      value.slice(0, 3) >= 150 &&
      value.slice(0, 3) <= 193) ||
    (/^\d{2}in$/.test(value) &&
      value.slice(0, 2) >= 59 &&
      value.slice(0, 2) <= 76),
  hcl: (value) => /^#[0-9a-f]{6}$/.test(value),
  ecl: (value) => /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(value),
  pid: (value) => /^\d{9}$/.test(value),
};

// Part 1
console.log(getNumberOfValidPassports(requiredFields, null, dataLines));

// Part 2
console.log(
  getNumberOfValidPassports(requiredFields, fieldValidators, dataLines)
);
