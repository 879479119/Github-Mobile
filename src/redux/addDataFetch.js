/**
 * this function is a decorator, which wrap a object
 * @param target
 */
export default function (target) {
  if ('getData' in target.prototype) {
    throw Error('you cannot use the method "getData" in your object working with common fetch the same time')
  }
  target.prototype.getData = (url) => { // eslint-disable-line
    const { queue } = this.props
    let data = {}
    queue.data.forEach((item) => {
      if (item.url === url) {
        data = item
        // TODO: this is a hack, maybe there is a better way to do this
        // if(item.status === 3) setTimeout(()=>{commonRelease(url)},0)
      }
    })
    return data
  }
}

