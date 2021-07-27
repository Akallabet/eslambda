import { identity } from '../identity'
import { ifElse } from '../if-else'
import { isEmpty } from '../is-empty'
import { isNotEmpty } from '../is-not-empty'

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
