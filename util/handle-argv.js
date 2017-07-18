let PATH = new Set()
let PARAMETER = new Set()

const isParameter = require('../api/is-parameter') 

const spliteParameter = require('../api/splite-parameter')

module.exports = argv => {

    if (argv.length == 0) {
        PATH.add('.')
    } else {
        for (let text of argv) {
            if (isParameter(text)) {
                PARAMETER.add(...spliteParameter(text))
            } else {
                PATH.add(text)
            }
        }
    }
    return {PATH, PARAMETER}

}