import { isEqualTo } from '../is-equal-to'

test('isEqualTo with missing inputs', () => {
  expect(isEqualTo()()).toBeFalsy()
  expect(isEqualTo()(4)).toBeFalsy()
  expect(isEqualTo(10)()).toBeFalsy()
})

test('isEqualTo with an equal number', () => {
  expect(isEqualTo(3)(3)).toBeTruthy()
})

test('isEqualTo with a greater number', () => {
  expect(isEqualTo(3)(4)).toBeFalsy()
})

test('isEqualTo with a smaller number', () => {
  expect(isEqualTo(3)(2)).toBeFalsy()
})
