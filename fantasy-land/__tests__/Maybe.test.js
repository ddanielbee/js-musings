// Instance of
// Semigroup ✅
// Monoid ✅
// Functor ✅
// Apply
// Applicative
// Traversable
// Monad

const jsc = require("jsverify");
const {
  associativity,
  rightIdentity,
  leftIdentity,
  identity,
  composition,
  applyComposition
} = require("../laws");
const { Maybe, Nothing, Just } = require("../Maybe");

const arbitraryMaybeString = jsc.bless({
  generator: () => {
    switch (jsc.random(0, 2)) {
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

const maybeRightIdentity = rightIdentity(Maybe);

const maybeLeftIdentity = leftIdentity(Maybe);

const maybeIdentity = identity(Maybe);

const maybeComposition = composition(Maybe);

const maybeApplyComposition = applyComposition(Maybe);

describe("The Maybe type", () => {
  describe("Has two possible definitions", () => {
    it("should return Nothing if the value passed is undefined || null", () => {
      const expected = Nothing().isNothing();
      const actual = Maybe.of(undefined).isNothing();
      expect(actual).toBe(expected);
    });

    it("should return Just if the value passed is not undefined || null", () => {
      const expected = Just(1).isJust();
      const actual = Maybe.of(1).isJust();
      expect(actual).toBe(expected);
    });
  });

  describe("Has an instance of Semigroup which", () => {
    describe("Has a concat method which", () => {
      it("should have a type of function", () => {
        const expected = "function";
        const actual = typeof Maybe.of().concat;
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

      it("should return the result of merging two objects when both are Justs(object)", () => {
        const expected = Just({ a: 1, b: 2, c: 4 }).toString();
        const actual = Just({ a: 1, b: 1 })
          .concat(Just({ b: 2, c: 4 }))
          .toString();
        expect(actual).toEqual(expected);
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

  describe("Has an instance of Monoid which", () => {
    describe("Has an empty method which", () => {
      it("should have a type of function", () => {
        const expected = "function";
        const actual = typeof Maybe.empty;
        expect(expected).toBe(actual);
      });

      it("should always return Nothing", () => {
        const expected = Nothing().toString();
        const actual = Maybe.empty().toString();
        expect(expected).toBe(actual);
      });

      it("should fulfil the right identity property", () => {
        expect(jsc.checkForall(arbitraryMaybeString, maybeRightIdentity)).toBe(true);
      });

      it("should fulfil the left identity property", () => {
        expect(jsc.checkForall(arbitraryMaybeString, maybeLeftIdentity)).toBe(true);
      });
    });
  });

  describe("Has an instance of Functor which", () => {
    describe("Has a map method which", () => {
      it("should have a type of function", () => {
        const expected = "function";
        const actual = typeof Maybe.of().map;
        expect(actual).toBe(expected);
      });

      it("should return Nothing if called on a Nothing", () => {
        const expected = Nothing().toString();
        const actual = Nothing()
          .map(Math.sqrt)
          .toString();
        expect(actual).toBe(expected);
      });

      it("should use Array's map function when called on a Just(Array)", () => {
        const expected = Just([1, 3, 4]).toString();
        const actual = Just([1, 9, 16])
          .map(Math.sqrt)
          .toString();
        expect(actual).toBe(expected);
      });

      it("should compose the two functions if called on a Just(function)", () => {
        const expected = Math.sqrt("Fantasy".length);
        const actual = Just(str => str.length)
          .map(Math.sqrt)
          .value()("Fantasy");
        expect(actual).toBe(expected);
      });

      it("should map the function over every property of a function if called on a Just(object)", () => {
        const expected = Just({ a: 1, b: 2, c: 3 }).toString();
        const actual = Just({ a: 1, b: 4, c: 9 })
          .map(Math.sqrt)
          .toString();
        expect(actual).toBe(expected);
      });

      it("should return the result of applying the function over the value if it's not an object, array or function", () => {
        const expected = Just(3).toString();
        const actual = Just(9)
          .map(Math.sqrt)
          .toString();
        expect(actual).toBe(expected);
      });

      it("should fulfil the identity property", () => {
        expect(jsc.checkForall(arbitraryMaybeString, maybeIdentity)).toBe(true);
      });

      it("should fulfil the composition property", () => {
        expect(
          jsc.checkForall(
            jsc.fn(jsc.string),
            jsc.fn(jsc.string),
            arbitraryMaybeString,
            maybeComposition
          )
        ).toBe(true);
      });
    });
  });

  describe("Has an instance of Apply which", () => {
    describe("Has an ap function which", () => {
      it("should have a type of function", () => {
        const expected = "function";
        const actual = typeof Maybe.of().ap;
        expect(actual).toBe(expected);
      });

      it("should throw when the passed argument is not of the same type", () => {
        expect(() => {
          Maybe.of(1).ap({ foo: "bar" });
        }).toThrow();
      });
      it("should always return Nothing when called on a Nothing", () => {
        const actual = Nothing().toString();
        const expected = Maybe.of()
          .ap(Maybe.of(x => x))
          .toString();
        expect(actual).toBe(expected);
      });
      it("should always return Nothing when called on a Just with a Nothing as argument", () => {
        const actual = Nothing().toString();
        const expected = Maybe.of(9)
          .ap(Maybe.of())
          .toString();
        expect(actual).toBe(expected);
      });
      it("should Throw if value inside of the argument Just is not a function", () => {
        expect(() => {
          Maybe.of(1).ap(Maybe.of(1));
        }).toThrow();
      });
      it("should apply the function inside of the argument to the value of the Just being called on, and return a Just of the result", () => {
        const expected = Just(3).toString();
        const actual = Just(9)
          .ap(Just(Math.sqrt))
          .toString();
        expect(actual).toBe(expected);
      });
      it("should fulfil the composition property", () => {
        expect(
          jsc.checkForall(
            jsc.fn(jsc.string),
            jsc.fn(jsc.string),
            arbitraryMaybeString,
            maybeApplyComposition
          )
        ).toBe(true);
      });
    });
  });
});
