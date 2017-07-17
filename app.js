const fs = require('fs')
const [ , ,...argv] = process.argv

if (argv.length == 0 ){
    fs.readdir(process.cwd(), (err, files)=>{
        if (err){
            console.error(err)
            return
        }
        for (let fileName of files){
            console.log(fileName)
        }
        
    })
}