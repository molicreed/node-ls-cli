const fs = require('fs')
const [ , ,...argv] = process.argv

if (argv.length == 0 ){
    try {
        let files = fs.readdirSync(process.cwd())
        for (let fileName of files){
            let stats = fs.statSync(fileName)
            if (stats.isDirectory()){
                console.log(fileName+ '/')
            } else if (stats.isFile()){
                console.log(fileName)
            }
        }
    } catch (err) {
        console.error(err)
    }
}