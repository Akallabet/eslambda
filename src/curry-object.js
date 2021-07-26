export const curryObj = (fn, key) => (context) => fn(context)(context[key])
