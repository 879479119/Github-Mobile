function timeout(page, callback) {
  setTimeout(() => {
    p = true
    if (page > 5) p = false
    console.log(page)
    callback(page)
  }, 1000)
}

function b() {
  return new Promise((sol, rej) => {
    let p = Promise.resolve(1),
      result = []
    t = p.then(call)
    function call(page) {
      return new Promise((resolve, reject) => {
        timeout(page, (res) => {
          page++
          result.push(res)
          if (res > 5) {
            sol(result)
          } else {
            t = t.then(call)
            resolve(page)
          }
        })
      })
    }
    return t
  })
}

b().then((res) => {
  console.log(res, 123)
})
