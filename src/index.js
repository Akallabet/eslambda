import { reduce } from './reduce'
import { identity } from './identity'
import { pipe } from './pipe'
import { isEmpty } from './is-empty'

export const forEach = (modifier = noop) => {
  const forEachRec = ([element, ...arr] = [], index = 0) => {
    if (!element) return
    modifier(element, index)
    forEachRec(arr, index + 1)
  }
  return forEachRec
}

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

export const split = (separator = '') => {
  const splitRec = ([char, ...str], acc = '', arr = []) =>
    (!char && isEmpty(arr) && ['']) ||
    (!char && acc && [...arr, ...acc]) ||
    (!char && !acc && [...arr]) ||
    (!separator && splitRec(str, '', [...arr, char])) ||
    (char === separator && splitRec(str, '', [...arr, acc])) ||
    splitRec(str, `${acc}${char}`, arr)

  return splitRec
}

export const push = (element) => (arr) => [...arr, element]
export const max = reduce((max, num) => (!max || num > max ? num : max))
export const isGreaterOrEqualThan = (n) => (x) => x >= n
export const isGreaterThan = (n) => (x) => x > n
export const extractValues = (arr) => Object.values(arr)
