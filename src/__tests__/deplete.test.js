import { deplete } from '../deplete'

test('deplete with no key', () => {
  const input = { foo: 'foo', bar: 'bar', test: 'test' }
  expect(deplete()(input)).toEqual({ foo: 'foo', bar: 'bar', test: 'test' })
})

test('deplete', () => {
  const input = { foo: 'foo', bar: 'bar', test: 'test' }
  expect(deplete('foo')(input)).toEqual({ bar: 'bar', test: 'test' })
})
