import { makeObject } from './make-object'
import { pipe } from './pipe'

export const objectFrom = (fn, key) => pipe(fn, makeObject(key))
