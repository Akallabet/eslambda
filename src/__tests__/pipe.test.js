import { pipe } from '../pipe'

test('pipe with no functions', () => {
  const op = pipe()
  expect(op(2)).toEqual(2)
})

test('pipe with one function', () => {
  const addOne = (n) => n + 1
  const op = pipe(addOne)
  expect(op(2)).toEqual(3)
})

test('pipe with two functions', () => {
  const addOne = (n) => n + 1
  const double = (n) => n * 2
  const op = pipe(addOne, double)
  expect(op(2)).toEqual(6)
})

test('pipe with no applied function', () => {
  const addOne = (n) => n + 1
  const notApplied = 2
  expect(() => pipe(addOne, notApplied)()).toThrowError(Error('fn is not a function'))
})
