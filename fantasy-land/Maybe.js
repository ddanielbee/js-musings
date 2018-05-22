// Instance of
// Semigroup ✅
// Monoid
// Functor
// Applicative
// Traversable
// Monad

const { fantasyConcat } = require("./utils");

const Nothing = value => ({
  value: () => Nothing(),
  isNothing: () => true,
  isJust: () => false,
  concat: other => other,
  toString: () => "Nothing",
  inspect: () => "Nothing",
  instances: ["Semigroup"]
});

const Just = value => ({
  value: () => value,
  isNothing: () => false,
  isJust: () => true,
  concat: other => {
    if (other.isNothing()) return Just(value);
    return Just(fantasyConcat(value, other.value()));
  },
  toString: () => `Just(${value})`,
  inspect: () => `Just(${value})`,
  instances: ["Semigroup"]
});

const Maybe = {
  empty: () => Nothing(),
  of: value => (typeof value === "undefined" || value === null ? Nothing() : Just(value))
};

module.exports = {
  Maybe,
  Nothing,
  Just
};
