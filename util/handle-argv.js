let PATH = new Set()
let PARAMETERS = new Set()

const isParameter = require('../api/is-parameter')

const spliteParameter = require('../api/splite-parameter')

// The -1, -C, -x, and -l options all override each other;
// the last one specified determines the format used.

// The -c and -u options override each other;
// the last one specified determines the file time used.

// The -B, -b, -w, and -q options all override each other;
// the last one specified determines the format used for non-printable characters.

// The -H, -L and -P options all override each other (either partially or fully);
// they are applied in the order specified.

// By default, ls lists one entry per line to standard output;
// the exceptions are to terminals or when the -C or -x options are speci- fied.

const OVERRIDE = [
  {
    para: new Set(['1', 'C', 'x', 'l']),
    now: null
  },
  {
    para: new Set(['c', 'u']),
    now: null
  },
  {
    para: new Set(['B', 'b', 'w', 'q']),
    now: null
  },
  {
    para: new Set(['H', 'L', 'P']),
    now: null
  },
]
module.exports = argv => {

  for (let text of argv) {
    if (isParameter(text)) {
      spliteParameter(text).forEach(
        para => {
          OVERRIDE.forEach(obj=>{
            if (obj.para.has(para)){
              obj.now = para
              para = null
            }
          })
          if (para) PARAMETERS.add(para)
        }
      )

    } else {
      PATH.add(text)
    }
  }
  OVERRIDE.forEach(obj=>{ 
    if(obj.now){
      PARAMETERS.add(obj.now)
    }
  })
  
  if (PATH.size === 0) {
    PATH.add('.')
  }
  return { PATH, PARAMETERS }

}