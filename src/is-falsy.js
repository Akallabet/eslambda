import { isTruthy } from './is-truthy'

export const isFalsy = (value) => !isTruthy(value)
