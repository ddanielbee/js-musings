// Test functor laws of a Maybe implementation

const jsc = require("jsverify");
const { functorIdentity, functorCompose } = require("./functorProperties");

const Nothing = () => ({
  fmap: fn => Nothing(),
  inspect: () => "Nothing",
  toString: () => "Nothing"
});

const Just = x => ({
  fmap: fn => Just(fn(x)),
  inspect: () => `Just(${x})`,
  toString: () => `Just(${x})`
});

const arbitraryMaybe = jsc.bless({
  generator: () => {
    switch (jsc.random(0, 1)) {
      case 0:
        return Nothing();
      case 1:
        return Just(jsc.integer);
    }
  }
});

describe("Law abidding Maybe Functor", () => {
  it("fulfils identity", () => {
    expect(jsc.checkForall(arbitraryMaybe, functorIdentity)).toBe(true);
  });
  it("fulfils composition", () => {
    expect(
      jsc.checkForall(jsc.fn(jsc.integer), jsc.fn(jsc.integer), arbitraryMaybe, functorCompose)
    ).toBe(true);
  });
});
