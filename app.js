
const fs = require('fs')

const handleArgv = require('./util/handle-argv')
const handlePath = require('./util/handle-path')
const FileInfo = require('./lib/file-info')



const [, , ...argv] = process.argv

const { PATH, PARAMETERS } = handleArgv(argv)
const CONFIG_INFO = require('./lib/output-config')(PARAMETERS)

// const printDir = name => require('./api/print')(name, {
//     isDir: true,
//     ...CONFIG_INFO
// })
FileInfo.prototype.config = CONFIG_INFO
let pathLen = PATH.size


for (let pathString of PATH) {
    if (pathLen >= 2) {
        process.stdout.write(pathString + ':\n')
    }
    let absolutePath = handlePath(pathString)
    try {
        if (fs.existsSync(absolutePath)) {
            //file or directory is exists

            let fileInfo = new FileInfo(absolutePath)
            if (!fileInfo.isDir || CONFIG_INFO.listDirAsPlainFiles) {
                // file
                fileInfo.print(true)

            } else {
                //directory
                if (CONFIG_INFO.showCurrentAndParentDir) {
                    ['.', '..'].forEach(info=>{
                        let absolutePath = handlePath(info)
                        
                        let file = new FileInfo(absolutePath,{
                            path: info,
                            keepPath: true
                        })
                        file.print(true)
                    })
                }
                for (let file of fileInfo.traverse()) {
                    file.print()
                }

            }
        } else {
            console.error(`ls: ${pathString}: No such file or directory`)
        }
    } catch (err) {
        console.log(err)
        // console.error('\n', err.message)

    }
    console.log('')
}

