import { isNotEmpty } from '../is-not-empty'

test('isNotEmpty with no paramaters', () => {
  expect(isNotEmpty()).toBeFalsy()
})

test('isNotEmpty with no array', () => {
  expect(isNotEmpty(1)).toBeFalsy()
})

test('isNotEmpty with empty array', () => {
  expect(isNotEmpty([])).toBeFalsy()
})

test('isNotEmpty with full array', () => {
  expect(isNotEmpty([1, 2, 3, 4, 5])).toBeTruthy()
})
