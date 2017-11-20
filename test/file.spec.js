/**
 * @author rocksama
 * @created 2017/11/19
 * @description
 */
const FileSystem = require('../src/utils/file-system')
FileSystem.setSerialization({

})
const fs = new FileSystem()

fs.writeFileAnyway('/src/a/b', {
  type: 'directory',
  detail: { type: 'aaa' },
}, [])


fs.writeFileAnyway('/src/c/c/s', {
  type: 'directory',
  detail: { type: 'ccc' },
}, [ {} ])

// fs.removeFile('/src')

const p = fs.getSerializedList('/src/c/c/s')

console.info(JSON.stringify(p, null, 2))
