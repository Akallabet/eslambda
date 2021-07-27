import { pipe } from './pipe'
import { enrich } from './enrich'

export const isDefined = (input) => !!input
export const isNumber = (value) => !isNaN(value)
export const makeObject = (key) => (args) => ({ [key]: args })

export const objectFrom = (fn, key = '') => pipe(fn, makeObject(key))
export const enrichObject = (fn, key = '') => enrich(objectFrom(fn, key))
export const isGreaterOrEqualThan = (n) => (x) => x >= n
export const isGreaterThan = (n) => (x) => x > n
export const extractValues = (arr) => Object.values(arr)
