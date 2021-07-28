import { isEqualTo } from './is-equal-to'
import { isGreaterThan } from './is-greater-than'

export const isGreaterOrEqualThan = (n) => (x) => isEqualTo(n)(x) || isGreaterThan(n)(x)
