const isHidden = (fileName) => {
    const regex = /^\./
    if (regex.test(fileName)) {
        return true
    } else {
        return false
    }
}

module.exports= isHidden