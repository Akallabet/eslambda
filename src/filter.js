import { truthy } from '.'
import { reduce } from './reduce'

export const filter = (predicate = truthy) =>
  reduce((accumulator, value) => (predicate(value) ? [...accumulator, value] : accumulator), [])
