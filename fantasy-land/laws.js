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

const rightIdentity = algebra => m =>
  algebra
    .of(m)
    .concat(algebra.empty())
    .toString() === algebra.of(m).toString();

const leftIdentity = algebra => m =>
  algebra
    .empty()
    .concat(algebra.of(m))
    .toString() === algebra.of(m).toString();

module.exports = {
  associativity,
  rightIdentity,
  leftIdentity
};
