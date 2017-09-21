let PATH = new Set()
let PARAMETERS = new Set()

const isParameter = require('../api/is-parameter') 

const spliteParameter = require('../api/splite-parameter')

module.exports = argv => {


    for (let text of argv) {
        if (isParameter(text)) {
            spliteParameter(text).forEach(
                para=>PARAMETERS.add(para)
            )
            
        } else {
            PATH.add(text)
        }
    }

    if (PATH.size ===0){
        PATH.add('.')
    }
    return {PATH, PARAMETERS}

}