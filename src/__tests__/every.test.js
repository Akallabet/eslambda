import { every } from '../every'

test('"every" with no predicate', () => {
  expect(every()([1, 2, 3, 4])).toBeTruthy()
})

test('"every" with no predicate and no array', () => {
  expect(every()()).toBeTruthy()
})

test('"every" with no array', () => {
  expect(every()()).toBeTruthy()
})

test.each([
  [[10, 11, 12, 9, 8, 123, 0, -1], false],
  [[10, 9, 8, 0, -1], false],
  [[11, 12, 13, 123, 1000], true],
])('every(%o) => %o', (input, output) => {
  const greaterThanTen = (num) => num > 10
  expect(every(greaterThanTen)(input)).toEqual(output)
})
