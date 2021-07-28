import { isGreaterOrEqualThan } from '../is-greater-or-equal-than'

test('isGreaterOrEqualThan with missing inputs', () => {
  expect(isGreaterOrEqualThan()()).toBeFalsy()
  expect(isGreaterOrEqualThan()(4)).toBeFalsy()
  expect(isGreaterOrEqualThan(10)()).toBeFalsy()
})

test('isGreaterOrEqualThan with an equal number', () => {
  expect(isGreaterOrEqualThan(3)(3)).toBeTruthy()
})

test('isGreaterOrEqualThan with a greater number', () => {
  expect(isGreaterOrEqualThan(3)(4)).toBeTruthy()
})

test('isGreaterOrEqualThan with a smaller number', () => {
  expect(isGreaterOrEqualThan(3)(2)).toBeFalsy()
})
