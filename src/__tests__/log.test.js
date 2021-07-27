import { log } from '../log'

beforeEach(() => {
  jest.spyOn(console, 'log').mockImplementationOnce(() => {})
})

const input = [1, 2, 3, 4, 5]

test('log without modifier', () => {
  log('here')(input)
  expect(console.log).toHaveBeenCalledWith('here', input)
})

test('log', () => {
  const callBack = jest.fn((x) => x)
  const res = log('here', callBack)(input)
  expect(res).toEqual(input)
  expect(console.log).toHaveBeenCalledWith('here', input)
})
