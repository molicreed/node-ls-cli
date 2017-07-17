const fs = require('fs')
const [ , ,...argv] = process.argv

if (argv.length == 0 ){
    fs.readdir(process.cwd(), (err, files)=>{
        if (err){
            console.error(err)
            return
        }
        for (let fileName of files){
            let name = fileName
            fs.stat(fileName, (err, stats)=>{
                if (err){
                    console.error(err)
                    return
                }
                if (stats.isDirectory()){
                    name = name + '/'
                }
                console.log(name)
            })
            
        }
        
    })
}