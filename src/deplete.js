export const deplete = (key) => (obj) => {
  if (key in obj) delete obj[key]
  return { ...obj }
}
