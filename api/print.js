
module.exports = (name, config) =>{
  if (config.longFormat){
    process.stdout.write(name)
  }
  process.stdout.write(name)
  if (config.isDir) process.stdout.write('/')
  process.stdout.write('  ')
  if (config.entryPerLine) {
    process.stdout.write('\n')
  }
}