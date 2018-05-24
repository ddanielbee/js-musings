const { compose, id } = require("./utils");
const { Maybe } = require("./Maybe");

const reflexivity = a => a.equals(a) === true;

const symmetry = (a, b) => a.equals(b) === b.equals(a);

const associativity = (a, b, c) =>
  a
    .concat(b)
    .concat(c)
    .equals(a.concat(b.concat(c)));

const rightIdentity = algebra => m => m.concat(algebra.empty()).equals(m);

const leftIdentity = algebra => m =>
  algebra
    .empty()
    .concat(m)
    .equals(m);

const identity = x => x.map(id).equals(x);

const composition = (f, g, x) => x.map(compose(f, g)).equals(x.map(g).map(f));

const applyComposition = (a, u, v) =>
  v.ap(u.ap(a.map(f => g => x => f(g(x))))).equals(v.ap(u).ap(a));

const applicativeIdentity = algebra => x =>
  algebra
    .of(x)
    .ap(algebra.of(id))
    .equals(algebra.of(x));

const applicativeHomomorphism = algebra => (f, x) =>
  algebra
    .of(x)
    .ap(algebra.of(f))
    .equals(algebra.of(f(x)));

const applicativeInterchange = algebra => (u, y) =>
  algebra
    .of(y)
    .ap(u)
    .equals(u.ap(algebra.of(f => f(y))));

const foldableReduce = (fn, initial, a) =>
  a.reduce(fn, initial) === a.reduce((acc, x) => acc.concat([x]), []).reduce(fn, initial);

const traversableIdentity = algebra => u => u.traverse(algebra, algebra.of).equals(algebra.of(u));

const chainAssociativity = (f, g, m) =>
  m
    .chain(f)
    .chain(g)
    .equals(m.chain(x => f(x).chain(g)));

const monadLeftIdentity = algebra => (f, a) =>
  algebra
    .of(a)
    .chain(f)
    .equals(f(a));

const monadRightIdentity = algebra => (f, m) => m.chain(algebra.of).equals(m);

module.exports = {
  reflexivity,
  symmetry,
  associativity,
  rightIdentity,
  leftIdentity,
  identity,
  composition,
  applyComposition,
  applicativeIdentity,
  applicativeHomomorphism,
  applicativeInterchange,
  foldableReduce,
  traversableIdentity,
  chainAssociativity,
  monadLeftIdentity,
  monadRightIdentity
};
