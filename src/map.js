import { identity } from './identity'
import { reduce } from './reduce'

export const map = (modifier = identity) =>
  reduce((accumulator, value, index) => [...accumulator, modifier(value, index)], [])
