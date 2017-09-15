
const fs = require('fs')
const path = require('path')
const isHidden = require('../api/is-hidden')

const isShow = (name,config) => {
    if (config['A'] || config['a']) {
        showHidden = true
    } else {
        showHidden = false
    }

    if (isHidden(name) && !showHidden){
        return false
    }

    return true

}
class FileInfo {
    constructor({ absolutePath }) {
        if (!this.config){
            throw 'config does not exist'
        } 
        let stats = fs.statSync(absolutePath)
        this.name = path.parse(absolutePath).base
        this.path = absolutePath
        this.isDir = stats.isDirectory()
        this.birthTime = stats.birthtime


        this.show = isShow(this.name, this.config)
        
        this.files = []
    }

    print() {
        if (!this.show) return
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