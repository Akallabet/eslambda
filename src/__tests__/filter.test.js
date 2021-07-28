import { filter } from '../filter'

test('filter', () => {
  const greaterThanTen = (num) => num > 10
  expect(filter(greaterThanTen)([10, 11, 12, 9, 8, 123, 0, -1])).toEqual([11, 12, 123])
})

test('filter with no predicate', () => {
  expect(filter()([10, 11, 12, 9, 8, 123, 0, -1])).toEqual([10, 11, 12, 9, 8, 123, 0, -1])
})

test.each([
  [
    [1, 2, 3, 4, 5, 6],
    [2, 4, 6],
  ],
])('filter %o: only even numbers => %o', (input, output) => {
  const isEven = (n) => n % 2 == 0
  expect(filter(isEven)(input)).toEqual(output)
})
