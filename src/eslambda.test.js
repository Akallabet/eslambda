import {
  curry,
  curryObj,
  enrich,
  every,
  filter,
  find,
  flatten,
  identity,
  isTruthy,
  join,
  map,
  max,
  pipe,
  pipeAsync,
  pipeCond,
  reduce,
  some,
  when,
} from '.'

test('pipe', () => {
  const addOne = (n) => n + 1
  const double = (n) => n * 2
  const op = pipe(addOne, double)
  expect(op(2)).toEqual(6)
})

test('pipe async', async () => {
  const addOne = (n) => n + 1
  const timesTwo = (n) => n * 2

  const addOneAsync = (n) => Promise.resolve(addOne(n))

  const timesTwoAsync = (n) => Promise.resolve(timesTwo(n))

  expect(await pipeAsync(addOneAsync, timesTwoAsync)(10)).toEqual(22)
})

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
  [2, true],
  [3, false],
])('when %i is defined and is even => %s', (input, output) => {
  const isEven = (n) => n % 2 === 0
  expect(when(isTruthy, isEven)(input)).toEqual(output)
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

test.each([
  [
    [1, 2, 3, 4, 5, 6],
    [2, 4, 6],
  ],
])('filter %o: only even numbers => %o', (input, output) => {
  const isEven = (n) => n % 2 == 0
  expect(filter(isEven)(input)).toEqual(output)
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

test('map index', () => {
  const addTwoAndIndex = (num, index) => num + index + 2
  expect(map(addTwoAndIndex)([1, 2, 3, 4, 5])).toEqual([3, 5, 7, 9, 11])
})

test('reduce', () => {
  const sum = (total, num) => total + num
  expect(reduce(sum, 0)([1, 2, 3, 4, 5, 6])).toEqual(21)
})

test('filter', () => {
  const greaterThanTen = (num) => num > 10
  expect(filter(greaterThanTen)([10, 11, 12, 9, 8, 123, 0, -1])).toEqual([11, 12, 123])
})

test('find should return "undefined" with an empty input', () => {
  expect(find((n) => n === 1)([])).toEqual(undefined)
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

test('curry', () => {
  const toCurry = (x, y, z) => x + y + z

  expect(curry(toCurry)(2)(3)(1)).toEqual(6)
})

test('join', () => {
  expect(join('-')([1, 2, 3, 4, 5, 6])).toEqual(`1-2-3-4-5-6`)
})

test('join with default separator', () => {
  expect(join()([1, 2, 3, 4, 5, 6])).toEqual(`1,2,3,4,5,6`)
})

test('max', () => {
  expect(max([10, 4, 2, 34, 343, 1])).toEqual(343)
})
