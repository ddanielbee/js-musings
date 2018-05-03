const jsc = require("jsverify");
const {
  incIsAlwaysGreatherThan,
  additionHasIdentity,
  additionIsAssociative
} = require("./mathProperties");

describe("Math properties: ", () => {
  jsc.property(
    "Incrementing a number by one always returns a number greater than the input",
    jsc.integer,
    incIsAlwaysGreatherThan
  );

  jsc.property("Addition has an Identity in 0", jsc.integer, additionHasIdentity);
  jsc.property(
    "Addition is associative",
    jsc.integer,
    jsc.integer,
    jsc.integer,
    additionIsAssociative
  );
});
