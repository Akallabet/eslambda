import { map } from '../map'

test('map with no modifiers', () => {
  // const addTwo = (num) => num + 2
  expect(map()([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5])
})

test('map', () => {
  const addTwo = (num) => num + 2
  expect(map(addTwo)([1, 2, 3, 4, 5])).toEqual([3, 4, 5, 6, 7])
})

test('map index', () => {
  const addTwoAndIndex = (num, index) => num + index + 2
  expect(map(addTwoAndIndex)([1, 2, 3, 4, 5])).toEqual([3, 5, 7, 9, 11])
})

test.each([
  [
    [1, 2, 3, 4, 5],
    [2, 4, 6, 8, 10],
  ],
])('map %o: double it => %o', (input, output) => {
  const double = (n) => n * 2
  expect(map(double)(input)).toEqual(output)
})
