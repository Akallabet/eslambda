export const pipeCond =
  (...fns) =>
  (x) => {
    let res = x
    for (const [cond, then, otherwise] of fns) {
      if (cond(res)) return then(res)
      res = otherwise(res)
    }
  }
