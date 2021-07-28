import { isNumber } from '../is-number'

test('isNumber with an integer', () => {
  expect(isNumber(1)).toBeTruthy()
})

test('isNumber with a float', () => {
  expect(isNumber(1.3)).toBeTruthy()
})

test('isNumber with a stringified number', () => {
  expect(isNumber('1')).toBeFalsy()
})

test('isNumber with a string', () => {
  expect(isNumber('string')).toBeFalsy()
})

test('isNumber with a boolean', () => {
  expect(isNumber(true)).toBeFalsy()
})
