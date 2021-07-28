import { hasKey } from './has-key'

export const hasNotKey = (key) => (obj) => !hasKey(key)(obj)
