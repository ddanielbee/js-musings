// Found on: https://egghead.io/courses/professor-frisby-introduces-composable-functional-javascript

const Right = x => ({
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  chain: f => f(x),
  inspect: () => `Right(${x})`,
  toString: () => `Right(${x})`
});

const Left = x => ({
  map: f => Left(x),
  fold: (f, g) => f(x),
  chain: f => Left(x),
  inspect: () => `Left(${x})`,
  toString: () => `Left(${x})`
});

const fromNullable = x => (x !== null && typeof x !== "undefined" ? Right(x) : Left(x));

const Either = x => ({
  map: f => Either.of(x).map(f),
  fold: (f, g) => Either.of(x).fold(f, g),
  inspect: () => `Either(${x})`,
  toString: () => `Either(${x})`
});

Either.of = fromNullable;

const a = {
  b: "foo",
  c: "bar"
};

const resultOne = Either.of(a.b).fold(x => "No such thing", x => x.toUpperCase()); // FOO

const resultTwo = Either.of(a.noProp).fold(x => "No such thing", x => x.toUpperCase()); // No such thing

module.exports = {
  Right,
  Left,
  fromNullable,
  Either
};
