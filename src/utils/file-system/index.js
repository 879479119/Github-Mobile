/**
 * @author rocksama
 * @created 2017/11/19
 * @description
 */
import pathLib from 'path'
import Profile from "../../components/User/Profile/index";

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
  constructor(userOptions) {
    const option = FileSystem.checkOptions(userOptions)
    this.tree = option.tree
  }
  static checkOptions(options) {
    const { tree, baseDirectory } = options
    const ret = {
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
  fileStat(path) {
    if (path === '' || path === '/') return this.tree
    const routes = path.split('/').slice(1)
    let { tree } = this
    routes.forEach((route, index) => {
      for (let i = 0; i < tree.children.length; i += 1) {
        if (tree.children[i].path === route) {
          if (index === routes.length) return tree.children[i]
          tree = tree.children[i]
        }
      }
    })
    return false
  }
  writeFile(path, detail, children) {
    const routes = path.split('/').slice(1)
    let { tree } = this
    routes.forEach((route, index) => {
      for (let i = 0; i < tree.children.length; i += 1) {
        if (tree.children[i].path === route) {
          if (index === routes.length) tree = { ...tree, detail, children }
          tree = tree.children[i]
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
        absolute: '/' + routes.slice(0, index).join('/'), // eslint-disable-line
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
  writeFileAnyway(path, detail, children) {
    const context = FileSystem.resolve(path, '../')
    if (this.fileStat(context) === false) {
      this.mkdirp(context)
    }
    this.writeFile(path, detail, children)


    const routes = path.split('/').slice(1)
    let dummy = tree
    routes.forEach((t, i) => {
      let index = findIndex(dummy.children, { path: t })
      if (index === -1) {
        if (i === routes.length - 1) {
          if (Array.isArray(array)) {
            index = dummy.children.push({
              type: 'directory',
              detail: {},
              path: t,
              children: array.map(n => ({
                type: n.type,
                detail: n,
                path: n.name,
                children: [],
              })),
            })
          } else {
            index = dummy.children.push({
              type: 'file',
              detail: array,
              path: t,
              children: [],
            })
          }
        } else {
          index = dummy.children.push({
            type: 'directory',
            detail: {},
            path: t,
            children: [],
          }) - 1
        }
      } else {
        if (i === routes.length - 1) {
          if (Array.isArray(array)) {
            dummy.children[index] = {
              ...dummy.children[index],
              children: array.map(n => ({
                type: n.type,
                detail: n,
                path: n.name,
                children: [],
              })),
            }
          } else {
            dummy.children[index] = {
              ...dummy.children[index],
              children: [{
                type: 'file',
                detail: array,
                path: t,
                children: [],
              }],
            }
          }
        }
      }
      dummy = dummy.children[index]
    })
  }
}

function update(path, tree, array, type) {
  const routes = path.split('/').slice(1)
  let dummy = tree
  routes.forEach((t, i) => {
    let index = findIndex(dummy.children, { path: t })
    if (index === -1) {
      if (i === routes.length - 1) {
        if (Array.isArray(array)) {
          index = dummy.children.push({
            type: 'directory',
            detail: {},
            path: t,
            children: array.map(n => ({
              type: n.type,
              detail: n,
              path: n.name,
              children: [],
            })),
          })
        } else {
          index = dummy.children.push({
            type: 'file',
            detail: array,
            path: t,
            children: [],
          })
        }
      } else {
        index = dummy.children.push({
          type: 'directory',
          detail: {},
          path: t,
          children: [],
        }) - 1
      }
    } else {
      if (i === routes.length - 1) {
        if (Array.isArray(array)) {
          dummy.children[index] = {
            ...dummy.children[index],
            children: array.map(n => ({
              type: n.type,
              detail: n,
              path: n.name,
              children: [],
            })),
          }
        } else {
          dummy.children[index] = {
            ...dummy.children[index],
            children: [{
              type: 'file',
              detail: array,
              path: t,
              children: [],
            }],
          }
        }
      }
    }
    dummy = dummy.children[index]
  })
}
