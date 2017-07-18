const fs = require('fs')
const path = require('path')
const FileInfo = require('./file-info')
const isHidden = require('../api/is-hidden')

const iteratorDirectory = (fileInfo) => {
    let fileArr = [];
    let files = fs.readdirSync(fileInfo.path)
    for (let fileName of files) {
        if (!isHidden(fileName)) {
            try {
                let absolutePath = path.resolve(fileInfo.path, fileName)
                let stats = fs.statSync(absolutePath)
                fileArr.push(new FileInfo({ absolutePath, stats }))
            } catch (err) {
                if (err.message.match('operation not permitted')) {
                    
                }

            }

        }
    }

    return fileArr
}

module.exports = iteratorDirectory