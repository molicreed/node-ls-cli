const fs = require('fs')
const [, , ...argv] = process.argv

const isHidden = (fileName) => {
    const regex = /^\./
    if (regex.test(fileName)) {
        return true
    } else {
        return false
    }
}
if (argv.length == 0) {
    try {
        let files = fs.readdirSync(process.cwd())
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
    } catch (err) {
        console.error(err)
    }
}