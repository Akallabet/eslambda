import { identity } from './identity'

export const reduce =
  (modifier = identity, initial) =>
  (arr = []) => {
    let index = 0
    let ret = initial

    while (index < arr.length) {
      ret = modifier(ret, arr[index], index, arr)
      index += 1
    }
    return ret
  }
