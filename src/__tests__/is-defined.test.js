import { isDefined } from '../is-defined'

test('isDefined with a truthy value', () => {
  expect(isDefined(true)).toBeTruthy()
})

test('isDefined with a falsy value', () => {
  expect(isDefined(false)).toBeFalsy()
})
