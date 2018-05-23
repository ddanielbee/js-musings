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
  if (Array.isArray(value)) return value.map(fn);
  if (typeof value === "object")
    return Object.keys(value).reduce((acc, cur) => {
      acc[cur] = fn(value[cur]);
      return acc;
    }, {});
  return fn(value);
};

const id = x => x;

module.exports = {
  fantasyConcat,
  fantasyMap,
  compose,
  id
};
