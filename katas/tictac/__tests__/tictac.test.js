const cloneArray = array => JSON.parse(JSON.stringify(array));

const placeMove = type => (position, field) => {
  const newField = cloneArray(field);
  if (newField[position[0]][position[1]] !== 0) return newField;
  newField[position[0]][position[1]] = type;
  return newField;
};

const placeX = placeMove("X");

const placeO = placeMove("O");

const isX = x => x === "X";
const isO = x => x === "O";

const isWinningTrio = fn => trio => trio.every(fn);

const isXtrio = isWinningTrio(isX);
const isOtrio = isWinningTrio(isO);

const someoneWon = field => {
  const winnerColumns = [field.map(x => x[0]), field.map(x => x[1]), field.map(x => x[2])];
  const winnerDiagonals = [[field[0][0], field[1][1], field[2][2]], [field[0][2], field[1][1], field[2][0]]];
  const winnerRows = cloneArray(field);
  const winnerXColumns = winnerColumns.map(isXtrio);
  const winnerOColumns = winnerColumns.map(isOtrio);
  const winnerXDiagonals = winnerDiagonals.map(isXtrio);
  const winnerODiagonals = winnerDiagonals.map(isOtrio);
  const winnerXRows = winnerRows.map(isXtrio);
  const winnerORows = winnerRows.map(isOtrio);
  if (winnerXColumns.includes(true) || winnerXDiagonals.includes(true) || winnerXRows.includes(true)) {
    return { won: true, who: "X" };
  }
  if (winnerOColumns.includes(true) || winnerODiagonals.includes(true) || winnerORows.includes(true)) {
    return { won: true, who: "O" };
  }
  return { won: false };
};

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

  it("should know when someone wins", () => {
    const field = [[0, 0, "X"], [0, 0, "X"], [0, 0, "X"]];
    const expected = { won: true, who: "X" };
    const actual = someoneWon(field);
    expect(actual).toEqual(expected);
  });
});
