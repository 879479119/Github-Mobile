/**
 * @author rocksama
 * @created 2017/11/19
 * @description
 */
const FileSystem = require('../src/utils/file-system')
FileSystem.setSerialization({

})
const fs = new FileSystem()



fs.writeFileAnyway('/src/a', {
  type: 'directory',
  detail: { type: 'kkkk' },
}, 'directory')

fs.writeFileAnyway('/src/a/b.js', {
  type: 'file',
  detail: { type: 'aaa', content: 'end' },
}, 'file')

fs.writeFileAnyway('/src', {
  type: 'directory',
  detail: { type: '22222222222222' },
}, 'directory')

// fs.removeFile('/src')

const p = fs.getSerializedList('/src/a/b.js')

console.info(JSON.stringify(p, null, 2))
