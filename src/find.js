import { falsy } from './falsy'

export const find = (predicate = falsy) => {
  const findRec = ([element, ...arr] = []) =>
    !element ? undefined : (predicate(element) && element) || findRec(arr)
  return findRec
}
