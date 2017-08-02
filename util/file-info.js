
const fs = require('fs')
const path = require('path')
const isHidden = require('../api/is-hidden')
const iteratorDircetory = require('./iterator-directory')

class FileInfo {
    constructor({ absolutePath }) {
        let stats = fs.statSync(absolutePath)
        this.name = path.parse(absolutePath).base
        this.path = absolutePath
        this.isDir = stats.isDirectory()
        this.birthTime = stats.birthtime
        this.hidden = isHidden(this.name)
        this.files = []
    }

    print() {
        process.stdout.write(this.name)
        if (this.isDir) process.stdout.write('/')
        process.stdout.write('  ')
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