// Test functor laws of an Either implementation

const jsc = require("jsverify");
const { functorIdentity, functorCompose } = require("./functorProperties");

const Left = x => ({
  fmap: fn => Left(x),
  inspect: () => `Left(${x})`,
  toString: () => `Left(${x})`
});

const Right = x => ({
  fmap: fn => Right(x),
  inspect: () => `Right(${x})`,
  toString: () => `Right(${x})`
});

const arbitraryEither = jsc.bless({
  generator: () => {
    switch (jsc.random(0, 1)) {
      case 0:
        return Left(jsc.string);
      case 1:
        return Right(jsc.integer);
    }
  }
});

const options = {
  quiet: true
};

const jscHelper = options => forAll => jsc.check(forAll, options);
const jscQuiet = jscHelper(options);

describe("Law abidding Either Functor", () => {
  it("fulfils identity", () => {
    expect(jscQuiet(jsc.forall(arbitraryEither, functorIdentity))).toBe(true);
  });
  it("fulfils composition", () => {
    expect(
      jscQuiet(
        jsc.forall(jsc.fn(jsc.integer), jsc.fn(jsc.integer), arbitraryEither, functorCompose)
      )
    ).toBe(true);
  });
});
