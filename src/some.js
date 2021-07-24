import { truthy } from '.'
import { filter } from './filter'
import { isNotEmpty } from './is-not-empty'
import { pipe } from './pipe'

export const some = (predicate = truthy) => pipe(filter(predicate), isNotEmpty)
