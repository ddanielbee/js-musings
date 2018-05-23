const { compose, id } = require("./utils");

const associativity = (a, b, c) =>
  a
    .concat(b)
    .concat(c)
    .toString() === a.concat(b.concat(c)).toString();

const rightIdentity = algebra => m => m.concat(algebra.empty()).toString() === m.toString();

const leftIdentity = algebra => m =>
  algebra
    .empty()
    .concat(m)
    .toString() === m.toString();

const identity = x => x.map(id).toString() === x.toString();

const composition = (f, g, x) =>
  x.map(compose(f, g)).toString() ===
  x
    .map(g)
    .map(f)
    .toString();

const applyComposition = (a, u, v) =>
  v.ap(u.ap(a.map(f => g => x => f(g(x))))).toString() ===
  v
    .ap(u)
    .ap(a)
    .toString();

const applicativeIdentity = algebra => x =>
  algebra
    .of(x)
    .ap(algebra.of(id))
    .toString() === algebra.of(x).toString();

const applicativeHomomorphism = algebra => (f, x) =>
  algebra
    .of(x)
    .ap(algebra.of(f))
    .toString() === algebra.of(f(x)).toString();

const applicativeInterchange = algebra => (u, y) =>
  algebra
    .of(y)
    .ap(u)
    .toString() === u.ap(algebra.of(f => f(y))).toString();

module.exports = {
  associativity,
  rightIdentity,
  leftIdentity,
  identity,
  composition,
  applyComposition,
  applicativeIdentity,
  applicativeHomomorphism,
  applicativeInterchange
};
