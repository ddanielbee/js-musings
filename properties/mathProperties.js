const inc = x => x + 1;

const incIsAlwaysGreatherThan = x => inc(x) > x;

const additionHasIdentity = x => x + 0 === x;

const additionIsAssociative = (x, y, z) => x + (y + z) === x + y + z;

module.exports = {
  incIsAlwaysGreatherThan,
  additionHasIdentity,
  additionIsAssociative
};
