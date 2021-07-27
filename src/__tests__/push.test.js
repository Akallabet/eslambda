import { push } from '../push'

test('push empty value', () => {
  expect(push()([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5])
})

test('push one value', () => {
  expect(push(10)([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5, 10])
})
