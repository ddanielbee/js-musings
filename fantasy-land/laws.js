const associativity = algebra => (a, b, c) =>
  algebra
    .of(a)
    .concat(algebra.of(b))
    .concat(algebra.of(c))
    .toString() ===
  algebra
    .of(a)
    .concat(algebra.of(b).concat(algebra.of(c)))
    .toString();

module.exports = {
  associativity
};
