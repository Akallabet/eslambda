import { addKey } from '../add-key'

test('addKey', () => {
  const input = { bar: 'bar', test: 'test' }
  expect(addKey(input, 'foo')('foo')).toEqual({ foo: 'foo', bar: 'bar', test: 'test' })
})
