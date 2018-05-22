const fantasyConcat = (semiOne, semiTwo) => {
  if (
    semiOne.instances &&
    semiTwo.instances &&
    semiOne.instances.includes("Semigroup") &&
    semiTwo.instances.includes("Semigroup")
  )
    return semiOne.concat(semiTwo);
  if (Array.isArray(semiOne) && Array.isArray(semiTwo)) return semiOne.concat(semiTwo);
  if (typeof semiOne === "number" && typeof semiTwo === "number") return semiOne + semiTwo;
  if (typeof semiOne === "string" && typeof semiTwo === "string") return `${semiOne}${semiTwo}`;
  if (typeof semiOne === "object" && typeof semiTwo === "object")
    return Object.assign({}, semiOne, semiTwo);
  throw new Error("Not instances of semigroup, or concatenable primitives!");
};

module.exports = {
  fantasyConcat
};
