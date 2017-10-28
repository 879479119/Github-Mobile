/**
 * usage:
 *        log()      => log in cyan,
 *        log(...,1) => error in red
 */

module.exports = (() => {
  return (...str) => {
    const tag = arguments.length === 1 ? 0 : arguments[arguments.length - 1]
    switch (tag) {
      case 1:
        process.stderr.write('\u001b[31m[ ERROR ] ==> \u001b[39m', ...str)
        break
      default:
        process.stdout.write('\u001b[36m[ LOG ] ==> \u001b[39m', ...str)
    }
    return true
  }
})(process.env.NODE_ENV)
