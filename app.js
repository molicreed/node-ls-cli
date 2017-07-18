const fs = require('fs')
const path = require('path')
const handleArgv = require('./api/handle-argv')
const isHidden = require('./api/is-hidden')


const [, , ...argv] = process.argv

const [PATH, PARAMETER] = handleArgv(argv)

let pathLen = PATH.size

for (let pathString of PATH){
    if (pathLen >= 2){
        process.stdout.write(pathString+':\n')
    }
    let absolutePath = path.resolve(process.cwd(), pathString)

    try {
        if (fs.existsSync(absolutePath)){
            //file or directory is exists
            
            let stats = fs.statSync(absolutePath)
            if (stats.isFile()){
                //it is a file
                process.stdout.write(pathString + '  ')

            } else if (stats.isDirectory()){
                // dir Directory
                let files = fs.readdirSync(absolutePath)
                for (let fileName of files) {
                    if ( !isHidden(fileName)) {

                        let stats = fs.statSync(path.resolve(absolutePath,fileName))

                        if (stats.isDirectory()) {
                            process.stdout.write(fileName + '/  ')
                            // console.log(fileName+ '/  ')
                        } else if (stats.isFile()) {
                            process.stdout.write(fileName + '  ')
                            // console.log(fileName + '  ')
                        }
                    }

                }
            }
        } else {
            throw new Error('node-ls-cli: cannot access '+ pathString + ': No such file or dircetory')
        }
    } catch (err) {
        if (err.message.match('operation not permitted')){
            console.error('\n')
        } else{
            console.error('\n',err.message)
        }
        
    }
    console.log('\n')
}

