import { reduce } from './reduce'

export const join = (separator = ',') =>
  reduce((str, element) => `${str}${str ? separator : ''}${element}`, '')
