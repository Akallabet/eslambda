import { isGreaterThan } from '../is-greater-than'

test('isGreaterThan with missing inputs', () => {
  expect(isGreaterThan()()).toBeFalsy()
  expect(isGreaterThan()(4)).toBeFalsy()
  expect(isGreaterThan(10)()).toBeFalsy()
})

test('isGreaterThan with an equal number', () => {
  expect(isGreaterThan(3)(3)).toBeFalsy()
})

test('isGreaterThan with a greater number', () => {
  expect(isGreaterThan(3)(4)).toBeTruthy()
})

test('isGreaterThan with a smaller number', () => {
  expect(isGreaterThan(3)(2)).toBeFalsy()
})
