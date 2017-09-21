
module.exports = (name, config) =>{
  process.stdout.write(name)
  if (config.isDir) process.stdout.write('/')
  process.stdout.write('  ')
  if (config.entryPerLine) {
    process.stdout.write('\n')
  }
}