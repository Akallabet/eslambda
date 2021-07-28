import { hasNotKey } from '../has-not-key'

test('hasNotKey', () => {
  expect(hasNotKey('foo')({ foo: 'foo' })).toBeFalsy()
})

test('hasNotKey with no values', () => {
  expect(hasNotKey()({ foo: 'foo' })).toBeTruthy()
})

test('hasNotKey when object does not have it', () => {
  expect(hasNotKey('bar')({ foo: 'foo' })).toBeTruthy()
})

test('hasNotKey when object has it and it is a falsy value', () => {
  expect(hasNotKey('foo')({ foo: 0 })).toBeFalsy()
  expect(hasNotKey('foo')({ foo: false })).toBeFalsy()
})
