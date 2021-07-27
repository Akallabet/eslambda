import { reduce } from './reduce'

export const when =
  (...fns) =>
  (x) =>
    reduce((y, fn) => y && fn(x), x)(fns)
