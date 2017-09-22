const configList = {
  //(The numeric digit ``one''.)  Force output to be one entry perline.  
  //This is the default when output is not to a terminal.
  '1': false,
  //List all entries except for . and ...  Always set for the superuser.
  'A': false,
  // Include directory entries whose names begin with a dot (.).
  'a': false,
  //默认显示文件的属性，权限，时间等
  'l': false,


  // 直接列出结果，而不进行排序 (ls 默认会以档名排序！)
  'f': false,
  // 根据文件、目录等资讯，给予附加数据结构，例如：
  //   *:代表可运行档； /:代表目录； =:代表 socket 文件； |:代表 FIFO 文件；
  'F': false,
  // 将文件容量以人类较易读的方式(例如 GB, KB 等等)列出来；
  'h': false,
  //列出 inode 号码
  'i': false,
  //长数据串列出，包含文件的属性与权限等等数据；(常用)
  'I': false,
  //列出 UID 与 GID 而非使用者与群组的名称
  'n': false,
  //将排序结果反向输出，例如：原本档名由小到大，反向则为由大到小；
  'r': false,
  //连同子目录内容一起列出来，等於该目录下的所有文件都会显示出来；
  'R': false,
  //以文件容量大小排序，而不是用档名排序；
  'S': false,
  //依时间排序，而不是用档名。
  't': false,

}

module.exports = parametars => {
  for (let para of parametars) {
    configList[para] = true
  }
  let config = {}
  if (configList['1'] || configList['l']) config.entryPerLine = true
  if (configList['A'] || configList['a']) {
    config.showFilesBeginWithDot = true
  }
  if (configList['a']) {
    config.showCurrentAndParentDir = true
  }

  if (configList['d']) {
    config.listDirAsPlainFiles = true
  }
  if (configList['l']) {
    config.longFormat = true
  }
  config.sortType = 'ASCII'
  if (configList['f']) {
    config.sortType = 'NONE'
  } 
  if (configList['S']) {
    config.sortType = 'SIZE'
  }
  if (configList['r']) {
    config.reverseSort = true
  }
  config.para = configList
  return config
}