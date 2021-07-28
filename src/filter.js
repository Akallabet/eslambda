import { reduce } from './reduce'
import { truthy } from './truthy'

export const filter = (predicate = truthy) =>
  reduce((accumulator, value) => (predicate(value) ? [...accumulator, value] : accumulator), [])
