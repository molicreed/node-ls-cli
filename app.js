const fs = require('fs')
const path = require('path')

const [, , ...argv] = process.argv
const PATH = new Set()
const PARAMETER = new Set()

const isHidden = (fileName) => {
    const regex = /^\./
    if (regex.test(fileName)) {
        return true
    } else {
        return false
    }
}

const isParameter = (text) => {
    const regex = /^\-/
    if (regex.test(text)){
        return true
    } else {
        return false
    }
}

const spliteParameter = (text) =>{
    if (text[0] == '-'){
        let paraArr = text.split('')
        paraArr.shift()
        return paraArr
    } else {
        throw new Error('arguments is not parameter')
    }
}



if (argv.length == 0){
    PATH.add('.')
} else {
    for (let text of argv){
        if (isParameter(text)){
            PARAMETER.add(...spliteParameter(text))
        } else {
            PATH.add(text)
        }
    }
}
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
        console.error(err.message)
    }
    console.log('\n')
}

