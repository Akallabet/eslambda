import { noop } from './noop'

export const forEach = (modifier = noop) => {
  const forEachRec = ([element, ...arr] = [], index = 0) => {
    if (!element) return
    modifier(element, index)
    forEachRec(arr, index + 1)
  }
  return forEachRec
}
