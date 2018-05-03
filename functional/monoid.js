const Addition = x => ({
  take: () => x,
  mappend: y => Addition(x + y.take()),
  inspect: () => `Addition(${x})`,
  toString: () => `Addition(${x})`
});

const additionEmpty = Addition(0);

const one = Addition(1);
const two = Addition(2);
const three = Addition(3);

const assoc =
  one.mappend(two.mappend(three)).toString() ===
  one
    .mappend(two)
    .mappend(three)
    .toString(); // true

const leftIdentity = one.mappend(additionEmpty).toString() === one.toString(); // true

const rightIdentity = additionEmpty.mappend(one).toString() === one.toString(); // true

// ListConcat :: [a] -> ListConcat [a]
const ListConcat = x => ({
  take: () => x,
  mappend: y => ListConcat(x.concat(y.take())),
  inspect: () => `ListConcat(${x})`,
  toString: () => `ListConcat(${x})`
});

const listConcatEmpty = ListConcat([]);

const listConcatAssoc =
  ListConcat([1])
    .mappend(ListConcat([2, 3]).mappend(ListConcat([4, 5])))
    .toString() ===
  ListConcat([1])
    .mappend(ListConcat([2, 3]))
    .mappend(ListConcat([4, 5]))
    .toString();

const mconcat = mempty => xs => xs.reduce((acc, cur) => acc.mappend(cur), mempty);

const additionConcat = mconcat(Addition(0));

const concatedAdditions = additionConcat([Addition(1), Addition(2), Addition(5)]);

console.log(concatedAdditions);
