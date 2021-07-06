import {
  curryObj,
  enrich,
  every,
  filter,
  flatten,
  identity,
  map,
  pipe,
  pipeCond,
  reduce,
  some,
} from '.'

test('pipe cond', () => {
  const greaterThan10 = (n) => n > 10
  const double = (n) => n * 2
  const first = () => 'first'
  const second = () => 'second'
  const third = () => 'third'

  const threshold = pipeCond(
    [greaterThan10, first, double],
    [greaterThan10, second, double],
    [greaterThan10, third, identity]
  )
  expect(threshold(11)).toEqual('first')
  expect(threshold(8)).toEqual('second')
  expect(threshold(4)).toEqual('third')
})

test.each([
  [
    [
      [1, 2, 3],
      [4, 5, 6],
    ],
    [1, 2, 3, 4, 5, 6],
  ],
  [
    [[[1, 2, 3]], [4, 5, 6]],
    [1, 2, 3, 4, 5, 6],
  ],
])('flatten %o => %o', (input, output) => {
  expect(flatten(input)).toEqual(output)
})

test('enrich', () => {
  const initial = { foo: 'bar' }
  const predicate = ({ foo }) => ({ moreFoo: `${foo}-enriched` })
  expect(enrich(predicate)(initial)).toEqual({ foo: 'bar', moreFoo: 'bar-enriched' })
  expect(enrich(() => ({ other: 'thing' }))(initial)).toEqual({ foo: 'bar', other: 'thing' })
})

test('map', () => {
  const addTwo = (num) => num + 2
  expect(map(addTwo)([1, 2, 3, 4, 5])).toEqual([3, 4, 5, 6, 7])
})

test('reduce', () => {
  const sum = (total, num) => total + num
  expect(reduce(sum, 0)([1, 2, 3, 4, 5, 6])).toEqual(21)
})

test('filter', () => {
  const greaterThanTen = (num) => num > 10
  expect(filter(greaterThanTen)([10, 11, 12, 9, 8, 123, 0, -1])).toEqual([11, 12, 123])
})

test.each([
  [[10, 11, 12, 9, 8, 123, 0, -1], true],
  [[10, 9, 8, 0, -1], false],
])('some(%o) => %o', (input, output) => {
  const greaterThanTen = (num) => num > 10
  expect(some(greaterThanTen)(input)).toEqual(output)
})

test.each([
  [[10, 11, 12, 9, 8, 123, 0, -1], false],
  [[10, 9, 8, 0, -1], false],
  [[11, 12, 13, 123, 1000], true],
])('every(%o) => %o', (input, output) => {
  const greaterThanTen = (num) => num > 10
  expect(every(greaterThanTen)(input)).toEqual(output)
})

test('curry object', () => {
  const toCurry = () => ({ context: { a: '1' }, value: 'test' })
  const appendText = () => (text) => `${text}append`
  const partial = pipe(toCurry, curryObj(appendText, 'value'))
  expect(partial()).toEqual('testappend')
})
