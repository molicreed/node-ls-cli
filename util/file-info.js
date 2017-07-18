
const path = require('path')
const isHidden = require('../api/is-hidden')

class FileInfo {
    constructor({absolutePath, stats}) {
        this.name = path.parse(absolutePath).base
        this.path = absolutePath
        this.type = stats.isFile() ? 'file' : stats.isDirectory() ? 'dir' : 'unknow'
        this.birthTime = stats.birthtime
        this.hidden = isHidden(this.name)
    }
}

module.exports = FileInfo