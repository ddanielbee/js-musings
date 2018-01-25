const sum = ar => ar.reduce((acc, cur) => acc + cur, 0);

const bowling = ([currentFrame, ...tail], lastSpare = false, lastStrike = false, score = 0) => {
  if (typeof currentFrame === "undefined") return score;
  const frameScore = sum(currentFrame);
  const isStrike = currentFrame.length === 1 && frameScore === 10;
  const isSpare = !isStrike && frameScore === 10;
  score += frameScore;
  if (tail.length !== 0 && lastSpare) {
    score += currentFrame[0];
  }
  if (tail.length !== 0 && lastStrike) {
    score += frameScore;
  }
  if (lastStrike && isStrike) {
    score += frameScore;
  }
  return bowling(tail, isSpare, isStrike, score);
};

describe("The bowling game function", () => {
  it("handles all 0", () => {
    const expected = 0;
    const actual = bowling([
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ]);
    expect(actual).toBe(expected);
  });

  it("handles all 1", () => {
    const expected = 20;
    const actual = bowling([
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1]
    ]);
    expect(actual).toBe(expected);
  });

  it("handles a spare in the first frame and 1 in all other rolls", () => {
    const expected = 29;
    const actual = bowling([
      [5, 5],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1]
    ]);
    expect(actual).toBe(expected);
  });

  it("handles a spare in the last frame and 1 in all other rolls", () => {
    const expected = 29;
    const actual = bowling([
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [5, 5],
      [1]
    ]);
    expect(actual).toBe(expected);
  });

  it("handles a strike in the first frame and 1 in all other rolls", () => {
    const expected = 30;
    const actual = bowling([
      [10],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1]
    ]);
    expect(actual).toBe(expected);
  });

  it("handles a strike in the last frame and 1 in all other rolls", () => {
    const expected = 30;
    const actual = bowling([
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [10],
      [1, 1]
    ]);
    expect(actual).toBe(expected);
  });

  it("handles a perfect game", () => {
    const expected = 300;
    const actual = bowling([[10], [10], [10], [10], [10], [10], [10], [10], [10], [10], [10, 10]]);
    expect(actual).toBe(expected);
  });
  it("handles this case", () => {
    const expected = 90;
    const actual = bowling([
      [9, 0],
      [9, 0],
      [9, 0],
      [9, 0],
      [9, 0],
      [9, 0],
      [9, 0],
      [9, 0],
      [9, 0],
      [9, 0]
    ]);
    expect(actual).toBe(expected);
  });

  it("handles this other case", () => {
    const expected = 150;
    const actual = bowling([
      [5, 5],
      [5, 5],
      [5, 5],
      [5, 5],
      [5, 5],
      [5, 5],
      [5, 5],
      [5, 5],
      [5, 5],
      [5, 5],
      [5]
    ]);
    expect(actual).toBe(expected);
  });
});
