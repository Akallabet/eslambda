import { join } from '../join'

test('join', () => {
  expect(join('-')([1, 2, 3, 4, 5, 6])).toEqual(`1-2-3-4-5-6`)
})

test('join with default separator', () => {
  expect(join()([1, 2, 3, 4, 5, 6])).toEqual(`1,2,3,4,5,6`)
})
