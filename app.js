
const fs = require('fs')
const path = require('path')

const handleArgv = require('./util/handle-argv')
const FileInfo = require('./lib/file-info')
const [, , ...argv] = process.argv

const { PATH, PARAMETERS } = handleArgv(argv)
const CONFIG_INFO = require('./lib/config')(PARAMETERS)
FileInfo.prototype.config = CONFIG_INFO

let pathLen = PATH.size

for (let pathString of PATH) {
    if (pathLen >= 2) {
        process.stdout.write(pathString + ':\n')
    }
    let absolutePath = path.resolve(process.cwd(), pathString)
    try {
        if (fs.existsSync(absolutePath)) {
            //file or directory is exists
            if (CONFIG_INFO['a']){
                process.stdout.write('./  ../  ')
            }
            let stats = fs.statSync(absolutePath)
            let fileInfo = new FileInfo({ absolutePath })
            if (!fileInfo.isDir) {
                file.print()
            } else {
                for (let file of fileInfo.traverse()) {
                    file.print()
                }
            }
        }
    } catch (err) {
        console.error('\n', err.message)

    }
    console.log('\n')
}

