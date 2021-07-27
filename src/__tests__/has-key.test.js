import { hasKey } from '../has-key'

test('hasKey with a value', () => {
  expect(hasKey('foo')({ foo: 'foo' })).toBeTruthy()
})

test('hasKey with no values', () => {
  expect(hasKey()({ foo: 'foo' })).toBeFalsy()
})

test('hasKey when object does not have it', () => {
  expect(hasKey('bar')({ foo: 'foo' })).toBeFalsy()
})

test('hasKey when object has it and it is a falsy value', () => {
  expect(hasKey('foo')({ foo: 0 })).toBeTruthy()
  expect(hasKey('foo')({ foo: false })).toBeTruthy()
})
