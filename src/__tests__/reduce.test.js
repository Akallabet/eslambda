import { reduce } from '../reduce'

test('reduce', () => {
  const sum = (total, num) => total + num
  expect(reduce(sum, 0)([1, 2, 3, 4, 5, 6])).toEqual(21)
})
