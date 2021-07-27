import { split } from '../split'

test('split', () => {
  const input = '1-2-3-4-5-6'
  expect(split('-')(input)).toEqual(['1', '2', '3', '4', '5', '6'])
})

test('split with no separator', () => {
  const input = '1-2-3-4-5-6'
  expect(split()(input)).toEqual(['1', '-', '2', '-', '3', '-', '4', '-', '5', '-', '6'])
})

test('split with empty string', () => {
  expect(split()('')).toEqual([''])
})
