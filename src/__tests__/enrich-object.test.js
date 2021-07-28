import { enrichObject } from '../enrich-object'

test('enrichObject', () => {
  const input = [1, 2, 3, 4, 5]
  expect(enrichObject(() => input, 'bar')({ foo: 'lol' })).toEqual({
    bar: input,
    foo: 'lol',
  })
})
