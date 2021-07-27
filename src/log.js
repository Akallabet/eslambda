import { identity } from './identity'

export const log =
  (label, modifier = identity) =>
  (args) => {
    console.log(label, modifier(args))
    return args
  }
