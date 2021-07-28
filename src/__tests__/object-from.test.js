import { objectFrom } from '../object-from'

test('objectFrom', () => {
  const input = 'bar'
  expect(objectFrom(() => input, 'foo')([1, 2, 3, 4, 5])).toEqual({ foo: 'bar' })
})
