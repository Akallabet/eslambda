import { extractKey } from '../extract-key'

test('extractKey', () => {
  expect(extractKey('foo')({ foo: [1, 2, 3, 4, 5], bar: 'bar' })).toEqual([1, 2, 3, 4, 5])
})
