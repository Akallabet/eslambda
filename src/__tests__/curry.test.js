import { curry } from '../curry'

test('curry with no arguments', () => {
  const toCurry = () => ''

  expect(curry(toCurry)()).toEqual('')
})

test('curry with 1 argument', () => {
  const toCurry = (x) => x + 2

  expect(curry(toCurry)(2)).toEqual(4)
})

test('curry with 3 arguments', () => {
  const toCurry = (x, y, z) => x + y + z

  expect(curry(toCurry)(2)(3)(1)).toEqual(6)
})
