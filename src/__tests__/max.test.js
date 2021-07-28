import { max } from '../max'

test('max', () => {
  expect(max([10, 4, 2, 34, 343, 1])).toEqual(343)
})

test('max no input', () => {
  expect(max()).toEqual(undefined)
})

test('max array with one number', () => {
  expect(max([1])).toEqual(1)
})
