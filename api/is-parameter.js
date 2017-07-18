module.exports = (text) => {
    const regex = /^\-/
    if (regex.test(text)) {
        return true
    } else {
        return false
    }
}