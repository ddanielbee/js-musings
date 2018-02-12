const turnColIntoRow = (m) => (transposedMatrix, _, colIndex) => 
  [...transposedMatrix, m.map(row => row[colIndex])];

const transpose = m => m[0].reduce(turnColIntoRow(m), [])

it("Transpose a 2x3 matrix", () => {
  const m1 = [
    [1, 2], 
    [3, 4], 
    [5, 6]
  ];
  const rotatedM = [
    [2, 4, 6],
    [1, 3, 5]
  ];
  const mirrored = [
    [1, 3, 5], 
    [2, 4, 6]
  ];
  expect(mirrored).toEqual(transpose(m1));
});

it("Transpose a 2x4 matrix", () => {
  const m1 = [
    [1, 2], 
    [3, 4], 
    [5, 6],
    [7, 8]
  ];
  const transposed = [
    [1, 3, 5, 7], 
    [2, 4, 6, 8]
  ];
  expect(transposed).toEqual(transpose(m1));
});
