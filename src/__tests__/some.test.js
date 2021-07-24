import { some } from '../some'

test.each([
  [[10, 11, 12, 9, 8, 123, 0, -1], true],
  [[10, 9, 8, 0, -1], false],
])('some(%o) => %o', (input, output) => {
  const greaterThanTen = (num) => num > 10
  expect(some(greaterThanTen)(input)).toEqual(output)
})

test('some with no predicate', () => {
  const input = [10, 9, 8, 0, -1]
  expect(some()(input)).toEqual(true)
})
