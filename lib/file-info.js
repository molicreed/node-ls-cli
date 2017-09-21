
const fs = require('fs')
const path = require('path')
const StatMode = require('stat-mode')
const isHidden = require('../api/is-hidden')
// const printFile = require('../api/print')
const _isShow = (name, config) => {
  if (isHidden(name) && !config.showFilesBeginWithDot) {
    return false
  } else {
    return true
  }
}

const _printTab = () => process.stdout.write('  ')
const _printInfo = info => {
  if (typeof info === 'number') info = info.toString()
  process.stdout.write(info)
  _printTab()
}
class FileInfo {
  constructor(absolutePath,fileConfig ={}) {
    if (!this.config) {
      throw 'config does not exist'
    }
    let stat = fs.statSync(absolutePath)
    this.stat = stat

    if (fileConfig.keepPath) {
      this.name = fileConfig.path
    } else {
      this.name = path.parse(absolutePath).base
    }
    
    this.path = absolutePath
    this.isDir = stat.isDirectory()
    this.modeString = (new StatMode(stat)).toString()
    
    this.show = _isShow(this.name, this.config)

    this.files = []
  }

  print(force = false) {
    if (this.show || force) {

      if (this.config.longFormat){
        let {stat} = this

        let {mtime} = stat
        
        let timeString = `${mtime.getMonth()+1} ${mtime.getDate()} ${mtime.getHours()}:${mtime.getMinutes()}`
        let fileInfoArr = [
          this.modeString, 
          stat.nlink, 
          stat.uid, 
          stat.gid, 
          stat.size, 
          timeString
        ]
        fileInfoArr.forEach(info=>{
          _printInfo(info)
        })
      }
      _printInfo(this.name + (this.isDir ? '/' : ''))
      if (this.config.entryPerLine) {
        console.log('')
      }
    }

  }

  traverse() {
    if (this.isDir) {
      let files = fs.readdirSync(this.path)
      for (let fileName of files) {
        try {
          let absolutePath = path.resolve(this.path, fileName)
          let stat = fs.statSync(absolutePath)
          this.files.push(new FileInfo( absolutePath ))
        } catch (err) {
          if (err.message.match('operation not permitted')) {

          }
          console.log(err)
        }
      }
    }
    return this.files
  }

}

module.exports = FileInfo