
const fs = require('fs')
const path = require('path')

const handleArgv = require('./util/handle-argv')
const FileInfo = require('./lib/file-info')
const printFile = require('/api/print')

const [, , ...argv] = process.argv

const { PATH, PARAMETERS } = handleArgv(argv)
// console.log(PATH,PARAMETERS)
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

            let fileInfo = new FileInfo({ absolutePath })
            if (!fileInfo.isDir || CONFIG_INFO.listDirAsPlainFiles) {
                // file
                fileInfo.print(true)

            } else {
                //directory
                if (CONFIG_INFO.showCurrentAndParentDir) {
                    printFile('.', true)
                    printFile('..', true)
                }
                for (let file of fileInfo.traverse()) {
                    file.print()
                }

            }
        } else {
            console.error(`ls: ${pathString}: No such file or directory`)
        }
    } catch (err) {
        console.error('\n', err.message)

    }
    console.log('\n')
}

