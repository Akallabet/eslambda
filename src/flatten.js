import { reduce } from './reduce'

export const flatten = reduce(
  (ret, res) => [...ret, ...(Array.isArray(...res) ? flatten(res) : res)],
  []
)
