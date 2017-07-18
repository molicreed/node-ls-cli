const fs = require('fs')
const path = require('path')
const handleArgv = require('./util/handle-argv')
const iteratorDircetory = require('./util/iterator-directory')
const FileInfo = require('./util/file-info')
const [, , ...argv] = process.argv

const { PATH, PARAMETER } = handleArgv(argv)

let pathLen = PATH.size



for (let pathString of PATH) {
    if (pathLen >= 2) {
        process.stdout.write(pathString + ':\n')
    }
    let absolutePath = path.resolve(process.cwd(), pathString)
    try {
        if (fs.existsSync(absolutePath)) {
            //file or directory is exists

            let stats = fs.statSync(absolutePath)
            let fileInfo = new FileInfo({ absolutePath, stats})
            if (fileInfo.type == 'file'){
                process.stdout.write(fileInfo.name + '  ')
            } else {
                let fileInfoArr = iteratorDircetory(fileInfo)
                for (let file of fileInfoArr){
                    process.stdout.write(file.name)
                    if (file.type == 'dir'){
                        process.stdout.write('/  ')
                    } else {
                        process.stdout.write('  ')
                    }
                }
            }
        }
    } catch (err) {
        console.error('\n', err.message)

    }
    console.log('\n')
}

