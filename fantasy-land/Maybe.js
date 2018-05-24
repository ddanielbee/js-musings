// Instance of
// Setoid ✅
// Semigroup ✅
// Monoid ✅
// Functor ✅
// Apply
// Applicative
// Traversable
// Monad

const { fantasyConcat, compose, fantasyMap, fantasyEquals } = require("./utils");

const Nothing = value => ({
  value: () => Nothing(),
  isNothing: () => true,
  isJust: () => false,
  equals: other => other.isNothing(),
  concat: other => other,
  map: fn => Nothing(),
  ap: other => Nothing(),
  constructor: Maybe,
  toString: () => "Nothing",
  inspect: () => "Nothing",
  instances: ["Semigroup", "Monoid", "Functor", "Apply", "Applicative"]
});

const Just = value => ({
  value: () => value,
  isNothing: () => false,
  isJust: () => true,
  equals: other => (other.isNothing() ? false : fantasyEquals(Just(value), other)),
  concat: other => (other.isNothing() ? Just(value) : Just(fantasyConcat(value, other.value()))),
  map: fn => Just(fantasyMap(fn, value)),
  ap: other => (other.isJust() ? Just(fantasyMap(other.value(), value)) : other),
  constructor: Maybe,
  toString: () => `Just(${value})`,
  inspect: () => `Just(${value})`,
  instances: ["Semigroup", "Monoid", "Functor", "Apply", "Applicative"]
});

const Maybe = {
  empty: () => Nothing(),
  of: value => Just(value),
  typeRepresentation: "Maybe"
};

module.exports = {
  Maybe,
  Nothing,
  Just
};
