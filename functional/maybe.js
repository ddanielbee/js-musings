const Nothing = () => ({
  isJust: () => false,
  fold: (b, f) => b,
  inspect: () => `Nothing`
});

const Just = x => ({
  isJust: () => true,
  fold: (b, f) => f(x),
  inspect: () => `Just${x}`
});

const isJust = x => x.isJust();

const isNothing = x => !x.isJust();

const maybeCatamorph = b => f => x => x.fold(b, f);

const identity = x => x;

const fromMaybe = b => x => x.fold(b, identity);

const listToMaybe = ([head, ...tail]) => (head ? Just(head) : Nothing());

const _ = "";

const maybeToList = x => (isJust(x) ? [fromMaybe(_)(x)] : []);

const not = Nothing();
const just1 = Just(1);

const list = listToMaybe([1, 2, 3]);
const notList = listToMaybe([]);

const result = maybeToList(just1);
const result2 = maybeToList(not);

console.log(list, notList);
