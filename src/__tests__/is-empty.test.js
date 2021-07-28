import { isEmpty } from '../is-empty'

test('isEmpty with no paramaters', () => {
  expect(isEmpty()).toBeFalsy()
})

test('isEmpty with no array', () => {
  expect(isEmpty(1)).toBeFalsy()
})

test('isEmpty with empty array', () => {
  expect(isEmpty([])).toBeTruthy()
})

test('isEmpty with full array', () => {
  expect(isEmpty([1, 2, 3, 4, 5])).toBeFalsy()
})
