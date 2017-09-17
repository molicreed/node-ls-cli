const config = require('../lib/config.js')

module.exports = (name, isDir = false) =>{
  process.stdout.write(name)
  if (isDir) process.stdout.write('/')
  process.stdout.write('  ')
  if (config.entryPerLine) {
    process.stdout.write('\n')
  }
}