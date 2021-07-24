import { identity } from '../identity'

test('identity with no parameters', () => {
  expect(identity()).toEqual(undefined)
})

test('identity with 1 number', () => {
  expect(identity(1)).toEqual(1)
})

test('identity with 1 string', () => {
  expect(identity('test')).toEqual('test')
})

test('identity with 1 array', () => {
  expect(identity([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5])
})

test('identity with 1 object', () => {
  expect(identity({ foo: 'foo', bar: 'bar' })).toEqual({ foo: 'foo', bar: 'bar' })
})
