export const curry =
  (f, arr = []) =>
  (...args) =>
    ((a) => (a.length === f.length ? f(...a) : curry(f, a)))([...arr, ...args])

export const reduce =
  (modifier = identity, initial) =>
  (arr = []) => {
    let index = 0
    let ret = initial

    while (index < arr.length) {
      ret = modifier(ret, arr[index], index, arr)
      index += 1
    }
    return ret
  }

export const map = (modifier = identity) =>
  reduce((accumulator, value, index) => [...accumulator, modifier(value, index)], [])

export const filter = (predicate = truthy) =>
  reduce((accumulator, value) => (predicate(value) ? [...accumulator, value] : accumulator), [])

export const isEmpty = (arr) => arr.length === 0
export const isNotEmpty = (arr) => arr.length > 0

export const some = (predicate = truthy) => pipe(filter(predicate), isNotEmpty)

export const every =
  (predicate = truthy) =>
  (arr = []) =>
    filter(predicate)(arr).length === arr.length

export const forEach =
  (modifier = noop) =>
  (arr = []) => {
    let index = 0

    while (index < arr.length) {
      modifier(arr[index], index)
      index += 1
    }
  }

export const find =
  (predicate = falsy) =>
  ([element, ...arr] = []) =>
    !element ? undefined : (predicate(element) && element) || find(predicate)(arr)

export const pipe =
  (...fns) =>
  (x) =>
    reduce((y, fn) => fn(y), x)(fns)

export const pipeAsync =
  (...fns) =>
  (x) =>
    reduce(async (y, monad) => monad(await y), x)(fns)

export const curryObj = (fn, key) => (context) => fn(context)(context[key])

export const pipeCond =
  (...fns) =>
  (x) => {
    let res = x
    for (const [cond, then, otherwise] of fns) {
      if (cond(res)) return then(res)
      res = otherwise(res)
    }
  }

export const when =
  (...fns) =>
  (x) =>
    reduce((y, fn) => y && fn(x), x)(fns)

export const isDefined = (input) => !!input
export const noop = () => {}
export const emptyString = () => {}
export const identity = (input) => input
export const falsy = () => false
export const truthy = () => true
export const isTruthy = (value) => !!value
export const isFalsy = (value) => !value
export const isNumber = (value) => !isNaN(value)
export const log =
  (label, parse = identity) =>
  (args) => {
    console.log(label, parse(args))
    return args
  }
export const join = (separator = ',') =>
  reduce((str, element) => `${str}${str ? separator : ''}${element}`, '')

export const flatten = reduce(
  (ret, res) => [...ret, ...(Array.isArray(...res) ? flatten(res) : res)],
  []
)

export const ifElse =
  (condition, then, otherwise = identity) =>
  (...input) =>
    condition(...input) ? then(...input) : otherwise(...input)

export const extractKey = (key) => (object) => object[key]
export const extractKeys = (keys) => (object) =>
  reduce(
    (ret, key) => ({
      ...ret,
      [key]: object[key],
    }),
    {}
  )(keys)

export const makeObject = (key) => (args) => ({ [key]: args })
export const enrich = (fn) => (args) => ({ ...args, ...fn({ ...args }) })
export const addKey =
  (context, key = '') =>
  (obj) => ({ ...context, [key]: obj })

export const deplete =
  (key = '') =>
  (obj) => {
    delete obj[key]
    return { ...obj }
  }
export const objectFrom = (fn, key = '') => pipe(fn, makeObject(key))
export const enrichObject = (fn, key = '') => enrich(objectFrom(fn, key))
export const hasKey = (key) => (obj) => isTruthy(obj[key])
export const hasNotKey = (key) => (obj) => isFalsy(obj[key])

export const split =
  (symbol = '') =>
  (str = '') =>
    str.split(symbol)

export const push = (element) => (arr) => [...arr, element]
export const max = reduce((max, num) => (!max || num > max ? num : max))
export const isGreaterOrEqualThan = (n) => (x) => x >= n
export const isGreaterThan = (n) => (x) => x > n
export const extractValues = (arr) => Object.values(arr)
