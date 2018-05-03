const id = x => x;

const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

const functorIdentity = f => f.fmap(id).toString() === f.toString();

const functorCompose = (f, g, x) =>
  x
    .fmap(g)
    .fmap(f)
    .toString() === x.fmap(compose(f, g)).toString();

module.exports = {
  functorIdentity,
  functorCompose
};
