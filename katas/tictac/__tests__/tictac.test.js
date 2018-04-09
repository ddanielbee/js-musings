const cloneArray = array => JSON.parse(JSON.stringify(array));

const placeMove = type => (position, field) => {
  const newField = cloneArray(field);
  if (newField[position[0]][position[1]] !== 0) return newField;
  newField[position[0]][position[1]] = type;
  return newField;
};

const placeX = placeMove("X");

const placeO = placeMove("O");

describe("Tic Tac Toe", () => {
  const emptyField = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  it("should put an X in the top right corner on an empty Field", () => {
    const expected = [[0, 0, "X"], [0, 0, 0], [0, 0, 0]];
    const actual = placeX([0, 2], emptyField);
    expect(actual).toEqual(expected);
  });

  it("should put an O in the top left corner on an empty field", () => {
    const expected = [["O", 0, 0], [0, 0, 0], [0, 0, 0]];
    const actual = placeO([0, 0], emptyField);
    expect(actual).toEqual(expected);
  });

  it("should put an X in the middle when there's already an O in the top right corner", () => {
    const field = [[0, 0, "O"], [0, 0, 0], [0, 0, 0]];
    const expected = [[0, 0, "O"], [0, "X", 0], [0, 0, 0]];
    const actual = placeX([1, 1], field);
    expect(actual).toEqual(expected);
  });

  it("should not put an X where there's already an X or an O", () => {
    const field = [[0, 0, "O"], [0, 0, 0], [0, 0, 0]];
    const expected = [[0, 0, "O"], [0, 0, 0], [0, 0, 0]];
    const actual = placeX([0, 2], field);
    expect(actual).toEqual(expected);
  });
});
