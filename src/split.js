import { isEmpty } from './is-empty'

export const split = (separator = '') => {
  const splitRec = ([char, ...str], acc = '', arr = []) =>
    (!char && isEmpty(arr) && ['']) ||
    (!char && acc && [...arr, ...acc]) ||
    (!char && !acc && [...arr]) ||
    (!separator && splitRec(str, '', [...arr, char])) ||
    (char === separator && splitRec(str, '', [...arr, acc])) ||
    splitRec(str, `${acc}${char}`, arr)

  return splitRec
}
