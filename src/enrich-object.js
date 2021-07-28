import { objectFrom } from './object-from'
import { enrich } from './enrich'

export const enrichObject = (fn, key) => enrich(objectFrom(fn, key))
