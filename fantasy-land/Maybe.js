// Instance of
// Semigroup ✅
// Monoid ✅
// Functor ✅
// Apply
// Applicative
// Traversable
// Monad

const { fantasyConcat, compose, fantasyMap } = require("./utils");

const Nothing = value => ({
  value: () => Nothing(),
  isNothing: () => true,
  isJust: () => false,
  concat: other => other,
  map: fn => Nothing(),
  ap: other => Nothing(),
  constructor: Maybe,
  toString: () => "Nothing",
  inspect: () => "Nothing",
  instances: ["Semigroup", "Monoid", "Functor"]
});

const Just = value => ({
  value: () => value,
  isNothing: () => false,
  isJust: () => true,
  concat: other => {
    if (other.isNothing()) return Just(value);
    return Just(fantasyConcat(value, other.value()));
  },
  map: fn => {
    return Just(fantasyMap(fn, value));
  },
  ap: other => {
    return other.isJust() ? Just(fantasyMap(other.value(), value)) : other;
  },
  constructor: Maybe,
  toString: () => `Just(${value})`,
  inspect: () => `Just(${value})`,
  instances: ["Semigroup", "Monoid", "Functor"]
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
