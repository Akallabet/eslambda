import { noop } from '../noop'
test('noop', () => {
  expect(noop()).toBeUndefined()
})
