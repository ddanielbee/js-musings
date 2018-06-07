const fantasyConcat = (semiOne, semiTwo) => {
  if (
    semiOne.instances &&
    semiTwo.instances &&
    semiOne.instances.includes("Semigroup") &&
    semiTwo.instances.includes("Semigroup")
  )
    return semiOne.concat(semiTwo);
  if (Array.isArray(semiOne) && Array.isArray(semiTwo)) return semiOne.concat(semiTwo);
  if (typeof semiOne === "string" && typeof semiTwo === "string") return `${semiOne}${semiTwo}`;
  if (typeof semiOne === "object" && typeof semiTwo === "object")
    return Object.assign({}, semiOne, semiTwo);
  throw new Error("Not instances of semigroup, or concatenable primitives!");
};

const compose = (...fns) => x => fns.reduceRight((acc, cur) => cur(acc), x);

const fantasyMap = (fn, value) => {
  if (typeof value.instances !== "undefined" && value.instances.includes("Functor"))
    return value.map(fn);
  return fn(value);
};

const id = x => x;

const equalArrays = (xs, ys) => {
  if (xs.length !== ys.length) return false;
  return xs
    .sort((a, b) => a < b)
    .map((x, i) => fantasyEquals(x, ys.sort((a, b) => a < b)[i]))
    .every(bool => bool);
};

const equalObjects = (x, y) => {
  if (Object.keys(x).length !== Object.keys(y).length) return false;
  return Object.keys(x)
    .map(key => y.hasOwnProperty(key) && fantasyEquals(x[key], y[key]))
    .every(bool => bool === true);
};

const sameType = (x, y) =>
  typeof x === typeof y &&
  typeof x.constructor !== "undefined" &&
  typeof y.constructor !== "undefined" &&
  x.constructor.typeRepresentation === y.constructor.typeRepresentation;

const fantasyEquals = (x, y) => {
  if (!sameType(x, y)) return false;
  if (
    typeof x.constructor.typeRepresentation !== "undefined" &&
    typeof y.constructor.typeRepresentation !== "undefined" &&
    x.constructor.typeRepresentation === y.constructor.typeRepresentation
  )
    return fantasyEquals(x.value(), y.value());

  if (Array.isArray(x)) return equalArrays(x, y);
  if (typeof x === "object") return equalObjects(x, y);
  return x === y;
};

module.exports = {
  fantasyConcat,
  fantasyMap,
  compose,
  id,
  fantasyEquals
};
