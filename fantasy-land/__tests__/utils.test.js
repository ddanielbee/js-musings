const { Just } = require("../Maybe");
const { fantasyEquals } = require("../utils");

describe("The equals function", () => {
  it("should return true if the primitive values passed are equal", () => {
    const actual = 1 === 1;
    const expected = fantasyEquals(1, 1);
    expect(actual).toBe(expected);
  });

  it("should return false if the primitive values passed are not equal", () => {
    const actual = 1 === 3;
    const expected = fantasyEquals(1, 3);
    expect(actual).toBe(expected);
  });

  it("should return false if the Eq instances passed are of different types", () => {
    const actual = fantasyEquals(
      { constructor: { typeRepresentation: "Maybe" } },
      { constructor: { typeRepresentation: "notMaybe" } }
    );
    expect(actual).toBe(false);
  });

  it("should return true if the Eq instances passed are of the same primitive type && the values inside are equal", () => {
    const actual = fantasyEquals(Just(1), Just(1));
    expect(actual).toBe(true);
  });

  it("should return true if the Eq instances passed are of the same type && the values inside are equal", () => {
    const actual = fantasyEquals(Just(1), Just(1));
    expect(actual).toBe(true);
  });

  it("should work on arrays", () => {
    const actual = fantasyEquals(Just([1, 2, 3]), Just([1, 2, 3]));
    expect(actual).toBe(true);
  });

  it("should work on objects", () => {
    const actual = fantasyEquals(Just({ foo: "bar" }), Just({ foo: "bar" }));
    expect(actual).toBe(true);
  });

  it("should recursively test objects", () => {
    const actual = fantasyEquals({ foo: { bar: "baz" } }, { foo: { bar: "baz" } });
    expect(actual).toBe(true);
  });

  it("should recursively test arrays", () => {
    const actual = fantasyEquals([[1, 2, 3], [4, 5, 6]], [[1, 2, 3], [4, 5, 6]]);
    expect(actual).toBe(true);
  });

  it("should recursively test algebras", () => {
    const actual = fantasyEquals(Just(Just(1)), Just(Just(1)));
    expect(actual).toBe(true);
  });
});
