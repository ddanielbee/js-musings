const jsc = require("jsverify");

// Write a function that:
// Takes an array of strings
// Removes all instances of certain characters (-)
// Makes sure concatenating the strings will result in a string
// shorter than 200 characters
// (by removing all extra fluff from the tail)
// Makes all strings lowercase
// Returns an array of the resulting strings.

const stringCleaning = xs =>
  xs
    .join(",")
    .replace(/-/g, "")
    .substring(0, 200)
    .toLowerCase()
    .split(",");

const noDashesProperty = xs =>
  stringCleaning(xs)
    .join("")
    .indexOf("-") === -1;

const limitedStringLengthProperty = xs => stringCleaning(xs).join("").length <= 200;

const lowerCaseProperty = xs =>
  stringCleaning(xs).reduce((acc, cur) => acc && cur.toLowerCase() === cur, true);

const largeString = jsc.suchthat(jsc.nestring, str => str.length > 5);

const stringArrayArb = jsc.array(largeString);

describe("Our string manipulation function", () => {
  it("should remove all instances of dash (-)", () => {
    expect(jsc.checkForall(stringArrayArb, noDashesProperty)).toBe(true);
  });

  it("should make sure the resulting concatenation is shorter than 200 chars", () => {
    expect(jsc.checkForall(stringArrayArb, limitedStringLengthProperty)).toBe(true);
  });
  it("should make sure the resulting concatenation is shorter than 200 chars", () => {
    expect(jsc.checkForall(stringArrayArb, lowerCaseProperty)).toBe(true);
  });
});
