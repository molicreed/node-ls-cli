let PATH = new Set()
let PARAMETER = new Set()



const isParameter = (text) => {
    const regex = /^\-/
    if (regex.test(text)) {
        return true
    } else {
        return false
    }
}

const spliteParameter = (text) => {
    if (text[0] == '-') {
        let paraArr = text.split('')
        paraArr.shift()
        return paraArr
    } else {
        throw new Error('arguments is not parameter')
    }
}

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
    return [PATH, PARAMETER]

}