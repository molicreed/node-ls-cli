
const fs = require('fs')
const path = require('path')
const isHidden = require('../api/is-hidden')
const printFile = require('../api/print')
const isShow = (name, config) => {
  if (isHidden(name) && !config.showFilesBeginWithDot) {
    return false
  } else {
    return true
  }
}
class FileInfo {
  constructor({ absolutePath }) {
    if (!this.config) {
      throw 'config does not exist'
    }
    let stats = fs.statSync(absolutePath)
    this.name = path.parse(absolutePath).base
    this.path = absolutePath
    this.isDir = stats.isDirectory()
    this.birthTime = stats.birthtime
    this.inode = stats.ino

    this.show = isShow(this.name, this.config)

    this.files = []
  }

  print(force = false) {
    if (this.show || force) {
      printFile(this.name, this.isDir)
    }

  }

  traverse() {
    if (this.isDir) {
      let files = fs.readdirSync(this.path)
      for (let fileName of files) {
        try {
          let absolutePath = path.resolve(this.path, fileName)
          let stats = fs.statSync(absolutePath)
          this.files.push(new this.constructor({ absolutePath }))
        } catch (err) {
          if (err.message.match('operation not permitted')) {

          }

        }
      }
    }
    return this.files
  }
}

module.exports = FileInfo