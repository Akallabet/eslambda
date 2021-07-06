export const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((y, fn) => fn(y), x)
export const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((y, fn) => fn(y), x)

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
    fns.reduce((y, fn) => y && fn(x), x)
export const whenOr =
  (...fns) =>
  (x) =>
    fns.reduce((y, fn) => y || fn(x), x)
export const isDefined = (input) => !!input
export const noop = () => {}
export const emptyString = () => {}
export const identity = (input) => input
export const falsy = () => false
export const truthy = () => true
export const isTruthy = (value) => !!value
export const isFalsy = (value) => !value
export const isNumber = (value) => !isNaN(value)
export const isEmpty = (arr) => arr.length === 0
export const isNotEmpty = (arr) => arr.length > 0
export const log =
  (label, parse = identity) =>
  (args) => {
    console.log(label, parse(args))
    return args
  }
export const join = (separator) => (arr) => arr.join(separator)
export const flatten = (arr = []) =>
  arr.reduce((ret, res) => [...ret, ...(Array.isArray(...res) ? flatten(res) : res)], [])

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

export const map =
  (predicate = identity) =>
  (arr = []) => {
    let index = 0
    let ret = []

    while (index < arr.length) {
      ret.push(predicate(arr[index], index))
      index += 1
    }
    return ret
  }

export const reduce =
  (predicate = identity, initial) =>
  (arr = []) => {
    let index = 0
    let ret = initial

    while (index < arr.length) {
      ret = predicate(ret, arr[index])
      index += 1
    }
    return ret
  }

export const find =
  (predicate = falsy) =>
  (arr = []) => {
    let index = 0
    let ret

    while (index < arr.length) {
      if (predicate(arr[index])) {
        ret = arr[index]
        break
      }
      index += 1
    }
    return ret
  }

export const filter =
  (predicate = truthy) =>
  (arr = []) => {
    let index = 0
    let ret = []

    while (index < arr.length) {
      if (predicate(arr[index])) ret.push(arr[index])
      index += 1
    }
    return ret
  }
export const push = (element) => (arr) => [...arr, element]
export const max = (arr) => Math.max(...arr)
export const isGreaterOrEqualThan = (n) => (x) => x >= n
export const isGreaterThan = (n) => (x) => x > n
export const extractValues = (arr) => Object.values(arr)

export const some =
  (predicate = truthy) =>
  (arr = []) =>
    filter(predicate)(arr).length > 0
export const every =
  (predicate = truthy) =>
  (arr = []) =>
    filter(predicate)(arr).length === arr.length

export const forEach =
  (predicate = noop) =>
  (arr = []) => {
    let index = 0

    while (index < arr.length) {
      predicate(arr[index], index)
      index += 1
    }
  }
