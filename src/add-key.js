export const addKey = (context, key) => (obj) => ({ ...context, [key]: obj })
