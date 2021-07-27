import { isFalsy } from '../is-falsy'

test('isFalsy with a truthy value', () => {
  expect(isFalsy(true)).toBeFalsy()
  expect(isFalsy('test')).toBeFalsy()
  expect(isFalsy(1)).toBeFalsy()
  expect(isFalsy([1, 2, 3, 4, 5])).toBeFalsy()
  expect(isFalsy({})).toBeFalsy()
})

test('isFalsy with a falsy value', () => {
  expect(isFalsy(false)).toBeTruthy()
  expect(isFalsy()).toBeTruthy()
  expect(isFalsy(0)).toBeTruthy()
  expect(isFalsy(null)).toBeTruthy()
  expect(isFalsy(undefined)).toBeTruthy()
})
