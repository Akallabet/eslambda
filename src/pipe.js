import { reduce } from './reduce'

export const pipe =
  (...fns) =>
  (x) =>
    reduce((y, fn) => fn(y), x)(fns)
