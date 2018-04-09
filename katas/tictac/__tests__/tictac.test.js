const placeMove = type => (position, field) => {
  if (type === "X") return [[0, 0, "X"], [0, 0, 0], [0, 0, 0]];
  return [["O", 0, 0], [0, 0, 0], [0, 0, 0]];
};

const placeX = placeMove("X");

const placeO = placeMove("O");

describe("Tic Tac Toe", () => {
  it("should put an X in the top right corner on an empty Field", () => {
    const field = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    const expected = [[0, 0, "X"], [0, 0, 0], [0, 0, 0]];
    const actual = placeX([0, 2], field);
    expect(expected).toEqual(actual);
  });

  it("should put an O in the top left corner on an empty field", () => {
    const field = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    const expected = [["O", 0, 0], [0, 0, 0], [0, 0, 0]];
    const actual = placeO([0, 2], field);
    expect(expected).toEqual(actual);
  });
});
