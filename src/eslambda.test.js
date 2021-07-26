import {
  addKey,
  deplete,
  enrich,
  extractKeys,
  flatten,
  ifElse,
  isTruthy,
  log,
  max,
  split,
  when,
} from '.'
import { identity } from './identity'
import { isEmpty } from './is-empty'
import { isNotEmpty } from './is-not-empty'

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
