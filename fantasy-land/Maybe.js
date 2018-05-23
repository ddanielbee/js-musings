// Instance of
// Semigroup ✅
// Monoid ✅
// Functor ✅
// Apply
// Applicative
// Traversable
// Monad

const { fantasyConcat, compose } = require("./utils");

const Nothing = value => ({
  value: () => Nothing(),
  isNothing: () => true,
  isJust: () => false,
  concat: other => other,
  map: fn => Nothing(),
  ap: semi => {
    if (semi.constructor.typeRepresentation !== "Maybe")
      throw new Error("Argument is not of the same type");
    if (typeof semi.value() !== "function")
      throw new Error("Value inside of Argument is not a function!");
    return Nothing();
  },
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
    if (Array.isArray(value)) return Just(value.map(fn));
    if (typeof value === "function") return Just(compose(fn, value));
    if (typeof value === "object")
      return Just(
        Object.keys(value).reduce((acc, cur) => {
          acc[cur] = fn(value[cur]);
          return acc;
        }, {})
      );
    return Just(fn(value));
  },
  ap: semi => {
    if (semi.constructor.typeRepresentation !== "Maybe")
      throw new Error("Argument is not of the same type!");
    if (semi.isNothing()) return Nothing();
    if (typeof semi.value() !== "function")
      throw new Error("Value inside of Argument is not a function!");
    return Just(semi.value()(value));
  },
  constructor: Maybe,
  toString: () => `Just(${value})`,
  inspect: () => `Just(${value})`,
  instances: ["Semigroup", "Monoid", "Functor"]
});

const Maybe = {
  empty: () => Nothing(),
  of: value => (typeof value === "undefined" || value === null ? Nothing() : Just(value)),
  typeRepresentation: "Maybe"
};

module.exports = {
  Maybe,
  Nothing,
  Just
};
