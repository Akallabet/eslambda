import { filter } from './filter'
import { truthy } from './truthy'

export const every =
  (predicate = truthy) =>
  (arr = []) =>
    filter(predicate)(arr).length === arr.length
