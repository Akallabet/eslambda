import { filter } from './filter'
import { isNotEmpty } from './is-not-empty'
import { pipe } from './pipe'
import { truthy } from './truthy'

export const some = (predicate = truthy) => pipe(filter(predicate), isNotEmpty)
