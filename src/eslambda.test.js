import { addKey, deplete, enrich, extractKeys, flatten, ifElse } from '.'
import { identity } from './identity'
import { isEmpty } from './is-empty'
import { isNotEmpty } from './is-not-empty'

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
