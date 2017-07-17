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

for (let pathString of PATH){
    process.stdout.write(pathString+':\n')
    try {
        if (fs.existsSync(pathString)){
            //file or directory is exists
            let stats = fs.statSync(pathString)

            if (stats.isFile()){
                process.stdout.write(pathString + '  ')

            } else if (stats.isDirectory()){
                
                let files = fs.readdirSync(pathString)
                for (let fileName of files) {
                    if ( !isHidden(fileName)) {

                        let stats = fs.statSync(fileName)

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
    process.stdout.write('\n')
}

