import { find } from '../find'

test('find should return "undefined" with no input', () => {
  expect(find((n) => n === 1)()).toEqual(undefined)
})

test('find should return "undefined" with an empty array', () => {
  expect(find((n) => n === 1)([])).toEqual(undefined)
})

test('should return "undefined" with an empty predicate', () => {
  expect(find()([1, 2, 3, 4, 1])).toEqual(undefined)
})

test('find should return the first match with a simple array', () => {
  expect(find((n) => n === 1)([1, 2, 3, 4, 1])).toEqual(1)
})

test('find should return the first match with a complex array', () => {
  expect(
    find(({ foo }) => foo === 1)([
      { foo: 1, bar: 2 },
      { foo: 2, bar: 3 },
      { foo: 1, bar: 4 },
    ])
  ).toEqual({ foo: 1, bar: 2 })
})
