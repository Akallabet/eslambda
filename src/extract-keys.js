import { extractKey } from './extract-key'
import { reduce } from './reduce'

export const extractKeys = (keys) => (object) =>
  reduce(
    (ret, key) => ({
      ...ret,
      [key]: extractKey(key)(object),
    }),
    {}
  )(keys)
