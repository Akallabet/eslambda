import { makeObject } from '../make-object'

test('makeObject', () => {
  expect(makeObject('bar')('bar')).toEqual({ bar: 'bar' })
})
