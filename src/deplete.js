import { hasKey } from './has-key'

export const deplete = (key) => (obj) => {
  if (hasKey(key)(obj)) delete obj[key]
  return { ...obj }
}
