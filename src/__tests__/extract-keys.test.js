import { extractKeys } from '../extract-keys'

test('extractKeys', () => {
  const input = { foo: 'foo', bar: 'bar', test: 'test' }
  expect(extractKeys(['foo', 'test'])(input)).toEqual({ foo: 'foo', test: 'test' })
})
