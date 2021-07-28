import { isTruthy } from '../is-truthy'

test('isTruthy with a truthy value', () => {
  expect(isTruthy(true)).toBeTruthy()
  expect(isTruthy('test')).toBeTruthy()
  expect(isTruthy(1)).toBeTruthy()
  expect(isTruthy([1, 2, 3, 4, 5])).toBeTruthy()
  expect(isTruthy({})).toBeTruthy()
})

test('isTruthy with a falsy value', () => {
  expect(isTruthy(false)).toBeFalsy()
  expect(isTruthy()).toBeFalsy()
  expect(isTruthy(0)).toBeFalsy()
  expect(isTruthy(null)).toBeFalsy()
  expect(isTruthy(undefined)).toBeFalsy()
})
