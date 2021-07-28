import { reduce } from './reduce'

export const max = reduce((max, num) => (!max || num > max ? num : max))
