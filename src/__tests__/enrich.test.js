import { enrich } from '../enrich'

test('enrich', () => {
  const initial = { foo: 'bar' }
  const predicate = ({ foo }) => ({ moreFoo: `${foo}-enriched` })
  expect(enrich(predicate)(initial)).toEqual({ foo: 'bar', moreFoo: 'bar-enriched' })
  expect(enrich(() => ({ other: 'thing' }))(initial)).toEqual({ foo: 'bar', other: 'thing' })
})
