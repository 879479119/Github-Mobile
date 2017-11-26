/**
 * @author rocksama
 * @created 2017/11/19
 * @description
 */
const pathLib = require('path')

const DIRECTORY = 'directory'
const FILE = 'file'
const TEMPLATE = {
  absolute: '/',
  path: '',
  type: DIRECTORY,
  detail: {},
  children: [],
}

export default class FileSystem {
  constructor(userOptions = {}) {
    const option = FileSystem.checkOptions(userOptions)
    this.tree = option.tree
    this.strict = option.strict
  }
  static checkOptions(options) {
    const { tree, baseDirectory } = options
    const ret = {
      strict: false,
      baseDirectory: '/',
      tree: {
        absolute: '/',
        path: '',
        type: DIRECTORY,
        detail: {},
        children: [],
      },
    }
    if (baseDirectory) {
      if (/^\//.test(baseDirectory)) ret.baseDirectory = baseDirectory.replace(/(.+)\/$/, '$1')
    }
    if (tree && tree instanceof Object) {
      try {
        JSON.stringify(tree, null, 2)
        ret.tree = tree
      } catch (e) {
        console.error(e) //eslint-disable-line
        console.error('invalid file tree, please check it again according to the errors above') //eslint-disable-line
      }
    }
    return ret
  }
  static resolve(root, path) {
    return pathLib.resolve(root, path)
  }
  static setSerialization(schema) {
    Object.defineProperty(FileSystem, 'schema', {
      getter: () => { return schema },
      writable: false,
    })
  }
  static serialize(stat) {
    const { schema = {} } = FileSystem
    if (stat === false) return { path: '', detail: {}, children: [] }
    return {
      path: stat.path,
      detail: stat.detail,
      children: stat.children,
      type: stat.type,
    }
  }
  fileStat(path) {
    if (path === '' || path === '/') return this.tree
    const routes = path.split('/').slice(1)
    let { tree } = this
    let ret = false
    routes.forEach((route, index) => {
      tree.children.forEach((t) => {
        if (t.path === route) {
          if (index === routes.length - 1) ret = t
          return tree = t
        }
      })
    })
    return ret
  }
  writeFile(path, detail, type) {
    const routes = path.split('/').slice(1)
    let { tree } = this
    let update = false
    routes.forEach((route, index) => {
      if (index === routes.length - 1) {
        const template = {
          absolute: '/' + routes.slice(0, index + 1).join('/'), // eslint-disable-line
          path: route,
          type,
          detail,
          children: [],
        }
        tree.children.forEach((t, i) => {
          if (t.path === route) {
            // tree = { ...tree, detail, type }
            t.detail = detail
            t.type = type
            update = true
          }
        })
        if (!update) tree.children.push(template)
        return update
      }
      for (let i = 0; i < tree.children.length; i += 1) {
        if (tree.children[i].path === route) {
          tree = tree.children[i]
          return
        }
      }
    })
    return false
  }
  mkdirp(path) {
    const routes = path.split('/').slice(1)
    let { tree } = this
    let hasAddNewRoute = false
    if (path === '' || path === '/') return hasAddNewRoute = true
    routes.forEach((route, index) => {
      for (let i = 0; i < tree.children.length; i += 1) {
        if (tree.children[i].path === route) {
          tree = tree.children[i]
          return
        }
      }
      const template = {
        absolute: '/' + routes.slice(0, index + 1).join('/'), // eslint-disable-line
        path: route,
        type: DIRECTORY,
        detail: {},
        children: [],
      }
      tree.children.push(template)
      hasAddNewRoute = true
      tree = template
    })
    return hasAddNewRoute
  }
  writeFileAnyway(path, detail, type) {
    const context = FileSystem.resolve(path, '../')
    if (this.fileStat(context) === false) {
      this.mkdirp(context)
    }
    this.writeFile(path, detail, type)
  }
  removeFile(path) {
    if (path === '' || path === '/') {
      this.tree = {
        absolute: '/',
        path: '',
        type: DIRECTORY,
        detail: {},
        children: [],
      }
      return true
    }
    if (this.fileStat(path) === false) return false
    const routes = path.split('/').slice(1)
    let { tree } = this
    routes.forEach((route, index) => {
      tree.children.forEach((t, i) => {
        if (t.path === route) {
          if (index === routes.length - 1) tree.children.splice(i, 1)
          return tree = t
        }
      })
    })
    return true
  }
  getSerializedList(path) {
    let routes = path.split('/')
    const ret = []
    if (path === '/') routes = ['']
    routes.reduce((base, r) => {
      const dist = base + '/' + r // eslint-disable-line
      const stat = this.fileStat(dist)
      if (this.strict && stat === false) {
        throw Error('you may use mkdirp to make sure that all the parent routes have been initialized in strict mode.')
      }
      ret.push(FileSystem.serialize(stat))
      return dist
    }, '')
    return ret
  }
}
