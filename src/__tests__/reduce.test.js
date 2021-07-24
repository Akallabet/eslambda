import { reduce } from '../reduce'

const sum = (total, num) => total + num

test('reduce with no modifier', () => {
  expect(reduce()([1, 2, 3, 4, 5, 6])).toBeUndefined()
})

test('reduce with no array', () => {
  expect(reduce(sum, 0)()).toEqual(0)
})

test('reduce', () => {
  expect(reduce(sum, 0)([1, 2, 3, 4, 5, 6])).toEqual(21)
})
