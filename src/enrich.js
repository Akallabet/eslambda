export const enrich = (fn) => (args) => ({ ...args, ...fn({ ...args }) })
