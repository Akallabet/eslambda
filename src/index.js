import { reduce } from './reduce'
import { identity } from './identity'
import { pipe } from './pipe'

export const isDefined = (input) => !!input
export const emptyString = () => {}
export const isTruthy = (value) => !!value
export const isFalsy = (value) => !value
export const isNumber = (value) => !isNaN(value)

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
export const isGreaterOrEqualThan = (n) => (x) => x >= n
export const isGreaterThan = (n) => (x) => x > n
export const extractValues = (arr) => Object.values(arr)
