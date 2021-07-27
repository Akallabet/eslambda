import { isTruthy } from '..'
import { when } from '../when'

test.each([
  [2, true],
  [3, false],
])('when %i is defined and is even => %s', (input, output) => {
  const isEven = (n) => n % 2 === 0
  expect(when(isTruthy, isEven)(input)).toEqual(output)
})
