import { pipeAsync } from '../pipe-async'

test('pipe async', async () => {
  const addOne = (n) => n + 1
  const timesTwo = (n) => n * 2

  const addOneAsync = (n) => Promise.resolve(addOne(n))

  const timesTwoAsync = (n) => Promise.resolve(timesTwo(n))

  expect(await pipeAsync(addOneAsync, timesTwoAsync)(10)).toEqual(22)
})
