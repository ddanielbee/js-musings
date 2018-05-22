// Instance of
// Semigroup ✅
// Monoid
// Functor
// Applicative
// Traversable
// Monad
const jsc = require("jsverify");
const { associativity } = require("../laws");
const { Maybe, Nothing, Just } = require("../Maybe");

const arbitraryMaybeString = jsc.bless({
  generator: () => {
    switch (jsc.random(0, 1)) {
      case 0:
        return undefined;
      case 1:
        return jsc.string;
      case 2:
        return jsc.string;
    }
  }
});

const maybeAssociativity = associativity(Maybe);

describe("The Maybe type", () => {
  describe("Has two possible definitions", () => {
    it("should return Nothing if the value passed is undefined || null", () => {
      const expected = Nothing().isNothing();
      const actual = Maybe(undefined).isNothing();
      expect(actual).toBe(expected);
    });

    it("should return Just if the value passed is not undefined || null", () => {
      const expected = Just(1).isJust();
      const actual = Maybe(1).isJust();
      expect(actual).toBe(expected);
    });
  });

  describe("Has an instance of Semigroup which", () => {
    describe("Has a concat method which", () => {
      it("should have a type of function", () => {
        const expected = "function";
        const actual = typeof Maybe().concat;
        expect(actual).toEqual(expected);
      });

      it("should return its argument if called on a Nothing", () => {
        const expected = "Just(1)";
        const actual = Nothing()
          .concat(Just(1))
          .toString();
        expect(actual).toBe(expected);
      });

      it("should return itself if called on a Just with a Nothing as parameter", () => {
        const expected = "Just(1)";
        const actual = Just(1)
          .concat(Nothing())
          .toString();
        expect(actual).toBe(expected);
      });

      it("should throw if the two types inside the Just are different / don't have a Semigroup instance", () => {
        expect(() => {
          Just(1).concat(Just({ foo: "bar" }));
        }).toThrow();
      });

      it("should return the result of concatenating its value with the parameter's value when both are Justs [array]", () => {
        const expected = [1, 2, 3, 4, 5, 6];
        const actual = Just([1, 2, 3])
          .concat(Just([4, 5, 6]))
          .value();
        expect(actual).toEqual(expected);
      });

      it("should return the result of concatenating its value with the parameter's value when both are Justs String", () => {
        const expected = Just("Hello World").toString();
        const actual = Just("Hello ")
          .concat(Just("World"))
          .toString();
        expect(actual).toEqual(expected);
      });

      it("should return the result of summing its value with the parameter's value when both are Justs Number", () => {
        const expected = Just(3).toString();
        const actual = Just(1)
          .concat(Just(2))
          .toString();
        expect(actual).toEqual(expected);
      });
      it("should return the result of mergint two objects when both are Justs(object)", () => {
        const expected = Just({ a: 1, b: 2, c: 4 }).toString();
        const actual = Just({ a: 1, b: 1 })
          .concat(Just({ b: 2, c: 4 }))
          .toString();
        expect(actual).toEqual(expected);
      });
    });
    it("should fulfil the law of associativity", () => {
      expect(
        jsc.checkForall(
          arbitraryMaybeString,
          arbitraryMaybeString,
          arbitraryMaybeString,
          maybeAssociativity
        )
      ).toBe(true);
    });
  });
});
