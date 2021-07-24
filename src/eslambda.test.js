import {
  addKey,
  curryObj,
  deplete,
  enrich,
  every,
  extractKeys,
  find,
  flatten,
  forEach,
  ifElse,
  isTruthy,
  join,
  log,
  max,
  pipeAsync,
  pipeCond,
  split,
  when,
} from '.'
import { identity } from './identity'
import { isEmpty } from './is-empty'
import { isNotEmpty } from './is-not-empty'
import { pipe } from './pipe'

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

test('join', () => {
  expect(join('-')([1, 2, 3, 4, 5, 6])).toEqual(`1-2-3-4-5-6`)
})

test('join with default separator', () => {
  expect(join()([1, 2, 3, 4, 5, 6])).toEqual(`1,2,3,4,5,6`)
})

test('max', () => {
  expect(max([10, 4, 2, 34, 343, 1])).toEqual(343)
})

test('log', () => {
  const input = [1, 2, 3, 4, 5]
  jest.spyOn(console, 'log').mockImplementationOnce(() => {})
  const callBack = jest.fn((x) => x)
  const res = log('here', callBack)(input)
  expect(res).toEqual(input)
  expect(console.log).toHaveBeenCalledWith('here', input)
})

test('forEach', () => {
  const input = [1, 2, 3, 4, 5, 6]
  const callBack = jest.fn(identity)
  const res = forEach(callBack)(input)
  expect(res).toBeUndefined()
  expect(callBack).toHaveBeenCalledTimes(6)
  expect(callBack).toHaveBeenNthCalledWith(1, 1, 0)
  expect(callBack).toHaveBeenNthCalledWith(2, 2, 1)
  expect(callBack).toHaveBeenNthCalledWith(3, 3, 2)
  expect(callBack).toHaveBeenNthCalledWith(4, 4, 3)
  expect(callBack).toHaveBeenNthCalledWith(5, 5, 4)
  expect(callBack).toHaveBeenNthCalledWith(6, 6, 5)
})

test('isElse - then', () => {
  const input = [1, 2, 3, 4, 5]
  const then = jest.fn(identity)
  const otherwise = jest.fn(identity)
  const res = ifElse(isNotEmpty, then)(input)
  expect(then).toHaveBeenCalledWith(input)
  expect(otherwise).not.toHaveBeenCalled()
  expect(res).toEqual(input)
})

test('isElse - otherwise', () => {
  const input = [1, 2, 3, 4, 5]
  const then = jest.fn(identity)
  const otherwise = jest.fn(identity)
  const res = ifElse(isEmpty, then, otherwise)(input)
  expect(then).not.toHaveBeenCalled()
  expect(otherwise).toHaveBeenCalledWith(input)
  expect(res).toEqual(input)
})

test('extractKeys', () => {
  const input = { foo: 'foo', bar: 'bar', test: 'test' }
  expect(extractKeys(['foo', 'test'])(input)).toEqual({ foo: 'foo', test: 'test' })
})

test('deplete', () => {
  const input = { foo: 'foo', bar: 'bar', test: 'test' }
  expect(deplete('foo')(input)).toEqual({ bar: 'bar', test: 'test' })
})

test('addKey', () => {
  const input = { bar: 'bar', test: 'test' }
  expect(addKey(input, 'foo')('foo')).toEqual({ foo: 'foo', bar: 'bar', test: 'test' })
})

test('split', () => {
  const input = '1-2-3-4-5-6'
  expect(split('-')(input)).toEqual(['1', '2', '3', '4', '5', '6'])
})

test('split - no separator', () => {
  const input = '1-2-3-4-5-6'
  expect(split()(input)).toEqual(['1', '-', '2', '-', '3', '-', '4', '-', '5', '-', '6'])
})

test('split - empty string', () => {
  expect(split()('')).toEqual([''])
})
