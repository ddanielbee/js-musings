const { compose, id } = require("./utils");

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

const identity = algebra => x =>
  algebra
    .of(x)
    .map(id)
    .toString() === algebra.of(x).toString();

const composition = algebra => (f, g, x) =>
  algebra
    .of(x)
    .map(compose(f, g))
    .toString() ===
  algebra
    .of(x)
    .map(g)
    .map(f)
    .toString();

module.exports = {
  associativity,
  rightIdentity,
  leftIdentity,
  identity,
  composition
};
