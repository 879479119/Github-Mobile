module.exports = (token) => {
  global.github.authenticate({
    type: 'oauth',
    token,
  })
}
