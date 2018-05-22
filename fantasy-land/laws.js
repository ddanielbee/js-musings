const associativity = algebra => (a, b, c) =>
  algebra(a)
    .concat(algebra(b))
    .concat(algebra(c))
    .toString() ===
  algebra(a)
    .concat(algebra(b).concat(algebra(c)))
    .toString();

module.exports = {
  associativity
};
