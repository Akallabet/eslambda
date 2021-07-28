import { getValues } from '../get-values'

test('getValues', () => {
  const input = { foo: 'foo', bar: 'bar' }
  expect(getValues(input)).toEqual(['foo', 'bar'])
})
