const jsc = require("jsverify");
const {
  reflexivity,
  symmetry,
  associativity,
  rightIdentity,
  leftIdentity,
  identity,
  composition,
  applyComposition,
  applicativeIdentity,
  applicativeHomomorphism,
  applicativeInterchange,
  foldableReduce,
  traversableIdentity,
  chainAssociativity,
  monadLeftIdentity,
  monadRightIdentity
} = require("../laws");

const { Maybe, Nothing, Just } = require("../Maybe");

const maybeArb = jsc.string.smap(Just, x => x.value(), y => y.toString());

const maybeFnArb = jsc.fn(jsc.string).smap(Just, x => x.value(), y => y.toString());

const maybeRightIdentity = rightIdentity(Maybe);

const maybeLeftIdentity = leftIdentity(Maybe);

const maybeApplicativeIdentity = applicativeIdentity(Maybe);

const maybeApplicativeHomomorphism = applicativeHomomorphism(Maybe);

const maybeApplicativeInterchange = applicativeInterchange(Maybe);

const maybeTraversableIdentity = traversableIdentity(Maybe);

const maybeMonadLeft = monadLeftIdentity(Maybe);

const maybeMonadRight = monadRightIdentity(Maybe);

describe("The Maybe type", () => {
  describe("Has an instance of Setoid which", () => {
    describe("Has an equals method which", () => {
      it("should have a type of function", () => {
        const expected = "function";
        const actual = typeof Just().equals;
        expect(actual).toBe(expected);
      });
      it("should return true for 2 Nothing", () => {
        const actual = Nothing().equals(Nothing());
        expect(actual).toBe(true);
      });
      it("should return false for 1 Nothing and 1 Just", () => {
        const actual = Nothing().equals(Just(1));
        expect(actual).toBe(false);
      });
      it("should return false for 1 Just and 1 Nothing", () => {
        const actual = Just(1).equals(Nothing());
        expect(actual).toBe(false);
      });
      it("should return true for 2 Just with the same value inside", () => {
        const actual = Just(1).equals(Just(1));
        expect(actual).toBe(true);
      });
      it("should fulfil the law of reflexivity", () => {
        expect(jsc.checkForall(maybeArb, reflexivity)).toBe(true);
      });
      it("should fulfil the law of symmetry", () => {
        expect(jsc.checkForall(maybeArb, maybeArb, symmetry)).toBe(true);
      });
    });
  });

  describe("Has an instance of Semigroup which", () => {
    describe("Has a concat method which", () => {
      it("should have a type of function", () => {
        const expected = "function";
        const actual = typeof Just().concat;
        expect(actual).toEqual(expected);
      });

      it("should return its argument if called on a Nothing", () => {
        const actual = Nothing()
          .concat(Just(1))
          .equals(Just(1));
        expect(actual).toBe(true);
      });

      it("should return itself if called on a Just with a Nothing as parameter", () => {
        const actual = Just(1)
          .concat(Nothing())
          .equals(Just(1));
        expect(actual).toBe(true);
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
        const actual = Just("Hello ")
          .concat(Just("World"))
          .equals(Just("Hello World"));
        expect(actual).toBe(true);
      });

      it("should return the result of merging two objects when both are Justs(object)", () => {
        const actual = Just({ a: 1, b: 1 })
          .concat(Just({ b: 2, c: 4 }))
          .equals(Just({ a: 1, b: 2, c: 4 }));
        expect(actual).toBe(true);
      });
      it("should fulfil the law of associativity", () => {
        expect(jsc.checkForall(maybeArb, maybeArb, maybeArb, associativity)).toBe(true);
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
        const actual = Maybe.empty().equals(Nothing());
        expect(actual).toBe(true);
      });

      it("should fulfil the right identity property", () => {
        expect(jsc.checkForall(maybeArb, maybeRightIdentity)).toBe(true);
      });

      it("should fulfil the left identity property", () => {
        expect(jsc.checkForall(maybeArb, maybeLeftIdentity)).toBe(true);
      });
    });
  });

  describe("Has an instance of Functor which", () => {
    describe("Has a map method which", () => {
      it("should have a type of function", () => {
        const expected = "function";
        const actual = typeof Just().map;
        expect(actual).toBe(expected);
      });

      it("should return Nothing if called on a Nothing", () => {
        const actual = Nothing()
          .map(Math.sqrt)
          .equals(Nothing());
        expect(actual).toBe(true);
      });

      it("should return the result of applying the function over the value if it's not an object or array", () => {
        const expected = Just(3).value();
        const actual = Just(9)
          .map(Math.sqrt)
          .value();
        expect(actual).toBe(expected);
      });

      it("should fulfil the identity property", () => {
        expect(jsc.checkForall(maybeArb, identity)).toBe(true);
      });

      it("should fulfil the composition property", () => {
        expect(jsc.checkForall(jsc.fn(jsc.string), jsc.fn(jsc.string), maybeArb, composition)).toBe(
          true
        );
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
          Just(1).ap({ foo: "bar" });
        }).toThrow();
      });
      it("should always return Nothing when called on a Nothing", () => {
        const actual = Nothing()
          .ap(Just(x => x))
          .equals(Nothing());
        expect(actual).toBe(true);
      });
      it("should always return Nothing when called on a Just with a Nothing as argument", () => {
        const actual = Just(9)
          .ap(Nothing())
          .equals(Nothing());
        expect(actual).toBe(true);
      });
      it("should Throw if value inside of the argument Just is not a function", () => {
        expect(() => {
          Just(1).ap(Just(1));
        }).toThrow();
      });
      it("should apply the function inside of the argument to the value of the Just being called on, and return a Just of the result", () => {
        const expected = Just(3).value();
        const actual = Just(9)
          .ap(Just(Math.sqrt))
          .value();
        expect(actual).toBe(expected);
      });
      it("should fulfil the composition property", () => {
        expect(jsc.checkForall(maybeFnArb, maybeFnArb, maybeArb, applyComposition)).toBe(true);
      });
    });
  });

  describe("Has an instance of Applicative which", () => {
    describe("Has a function of on the type representative which", () => {
      it("should fulfil the identity property", () => {
        expect(jsc.checkForall(maybeArb, maybeApplicativeIdentity)).toBe(true);
      });

      it("should fulfil the homomorphism property", () => {
        expect(jsc.checkForall(jsc.fn(jsc.string), jsc.string, maybeApplicativeHomomorphism)).toBe(
          true
        );
      });

      it("should fulfil the interchange property", () => {
        expect(jsc.checkForall(maybeFnArb, jsc.string, maybeApplicativeInterchange)).toBe(true);
      });
    });
  });

  describe("Has an instance of Foldable which", () => {
    describe("Has a reduce method which", () => {
      it("should have a type of function", () => {
        const expected = "function";
        const actualJust = typeof Just(1).reduce;
        const actualNothing = typeof Nothing().reduce;
        expect(actualJust).toBe(expected);
        expect(actualNothing).toBe(expected);
      });
      it("should take a function and an initial value as arguments (arity of 2)", () => {
        const expected = 2;
        const actualNothing = Nothing().reduce.length;
        const actualJust = Just().reduce.length;
        expect(actualNothing).toBe(expected);
        expect(actualJust).toBe(expected);
      });

      it("should return the initial value provided when called on a Nothing", () => {
        const expected = 10;
        const actual = Nothing().reduce((acc, x) => acc + x, 10);
        expect(actual).toBe(expected);
      });

      it("should return the result of calling the function with initial value and value inside of Just", () => {
        const expected = 100;
        const actual = Just(2).reduce(Math.pow, 10);
        expect(actual).toBe(expected);
      });

      it("should fulfil the foldableReduce property", () => {
        expect(jsc.checkForall(jsc.fn(jsc.string), jsc.string, maybeArb, foldableReduce)).toBe(
          true
        );
      });
    });
  });

  describe("Has an instance of Traversable which", () => {
    describe("Has a traverse method which", () => {
      it("should have a type of function", () => {
        const actualNothing = typeof Nothing().traverse;
        const actualJust = typeof Just().traverse;
        expect(actualNothing).toBe("function");
        expect(actualJust).toBe("function");
      });

      it("should take 2 arguments", () => {
        const actualNothing = Nothing().traverse.length;
        const actualJust = Just().traverse.length;
        expect(actualNothing).toBe(2);
        expect(actualJust).toBe(2);
      });

      it("should return the result of applying the type representative's .of function to Nothing if called on a Nothing", () => {
        const expected = Just(Nothing());
        const actual = Nothing().traverse(Maybe, x => Just(x));
        expect(actual.equals(expected)).toBe(true);
      });

      it("should return the result of mapping Just over the result of applying the function to the value inside the Just", () => {
        const expected = Just(Just(3));
        const actual = Just(9).traverse(Maybe, x => Just(Math.sqrt(x)));
        expect(actual.equals(expected)).toBe(true);
      });

      it("should fulfil the identity property", () => {
        expect(jsc.checkForall(maybeArb, maybeTraversableIdentity)).toBe(true);
      });

      // TODO: find a way to test naturality and composition in Traversable
    });
  });

  describe("Has an instance of Chain which", () => {
    describe("Has a chain method which", () => {
      it("should have a type of function", () => {
        const actualNothing = typeof Nothing().chain;
        const actualJust = typeof Just().chain;
        expect(actualNothing).toBe("function");
        expect(actualJust).toBe("function");
      });

      it("should take 1 arguments", () => {
        const actualNothing = Nothing().chain.length;
        const actualJust = Just().chain.length;
        expect(actualNothing).toBe(1);
        expect(actualJust).toBe(1);
      });

      it("should return Nothing if called on a Nothing", () => {
        const expected = Nothing();
        const actual = Nothing().chain(x => Just(x));
        expect(actual.equals(expected)).toBe(true);
      });

      it("should return the result of applying the function to the value inside the Just", () => {
        const expected = Just(20);
        const actual = Just(10).chain(x => Just(x * 2));
        expect(actual.equals(expected)).toBe(true);
      });

      it("should fulfil the associativity property", () => {
        expect(
          jsc.checkForall(jsc.fn(maybeArb), jsc.fn(maybeArb), maybeArb, chainAssociativity)
        ).toBe(true);
      });
    });
  });

  describe("Has an instance of Monad which", () => {
    it("should fulfil the left identity property", () => {
      expect(jsc.checkForall(jsc.fn(maybeArb), jsc.string, maybeMonadLeft)).toBe(true);
    });

    it("should fulfil the right identity property", () => {
      expect(jsc.checkForall(jsc.fn(maybeArb), maybeArb, maybeMonadRight)).toBe(true);
    });
  });
});
