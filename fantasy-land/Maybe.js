const { fantasyConcat } = require("./utils");

const Maybe = value => (typeof value === "undefined" || value === null ? Nothing() : Just(value));

const Nothing = value => ({
  value: () => Nothing(),
  isNothing: () => true,
  isJust: () => false,
  concat: other => other,
  toString: () => "Nothing",
  instances: ["Semigroup"],
  testValue: "Nothing"
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
  instances: ["Semigroup"],
  testValue: value
});

module.exports = {
  Maybe,
  Nothing,
  Just
};
