import { forEach } from '../for-each'
import { identity } from '../identity'

test('forEach with no input', () => {
  const callBack = jest.fn(identity)
  const res = forEach(callBack)()
  expect(res).toBeUndefined()
  expect(callBack).not.toHaveBeenCalled()
})

test('forEach with no callBack', () => {
  const res = forEach()([1, 2, 3, 4, 5, 6])
  expect(res).toBeUndefined()
})

test('forEach with an array', () => {
  const input = [1, 2, 3, 4, 5, 6]
  const callBack = jest.fn(identity)
  const res = forEach(callBack)(input)
  expect(res).toBeUndefined()
  expect(callBack).toHaveBeenCalledTimes(6)
  expect(callBack).toHaveBeenNthCalledWith(1, 1, 0)
  expect(callBack).toHaveBeenNthCalledWith(2, 2, 1)
  expect(callBack).toHaveBeenNthCalledWith(3, 3, 2)
  expect(callBack).toHaveBeenNthCalledWith(4, 4, 3)
  expect(callBack).toHaveBeenNthCalledWith(5, 5, 4)
  expect(callBack).toHaveBeenNthCalledWith(6, 6, 5)
})
