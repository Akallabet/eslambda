import { reduce } from './reduce'

export const pipeAsync =
  (...fns) =>
  (x) =>
    reduce(async (y, monad) => monad(await y), x)(fns)
