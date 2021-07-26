import { curryObj } from '../curry-object'
import { pipe } from '../pipe'

test('curry object', () => {
  const toCurry = () => ({ context: { a: '1' }, value: 'test' })
  const appendText = () => (text) => `${text}append`
  const partial = pipe(toCurry, curryObj(appendText, 'value'))
  expect(partial()).toEqual('testappend')
})
