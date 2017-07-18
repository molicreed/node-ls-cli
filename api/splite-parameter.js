module.exports = (text) => {
    if (text[0] == '-') {
        let paraArr = text.split('')
        paraArr.shift()
        return paraArr
    } else {
        throw new Error('arguments is not parameter')
    }
}