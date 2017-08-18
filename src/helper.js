const Table = require('cli-table')

function logTable (objects) {
  const serializeValues = keys => obj => keys.reduce((prev, key) => prev.concat(obj[key] || ''), [])
  const mergeKeys = (obj, keys) => keys.reduce((prev, key) => Object.assign(prev, {[key]: true}), obj)
  const keysObject = objects.reduce((prev, object) => mergeKeys(prev, Object.keys(object)), {})
  const keys = Object.keys(keysObject)
  const values = objects.map(serializeValues(keys))

  const startingWidths = keys.map(k => 0)
  const widths = values.reduce(
    (prev, row) => prev.map((v, i) => ((v > row[i].length) ? v : row[i].length)),
    startingWidths
  )

  console.log(widths)

  const table = new Table({
    head: keys,
    colWidths: widths.map(w => w + 2)
  })

  values.forEach(value => {
    table.push(value)
  })

  console.log(table.toString())
}

function logObject (object) {
  const table = new Table()

  Object.keys(object).forEach(key => {
    const row = {}
    row[key] = object[key]
    table.push(row)
  })

  console.log(table.toString())
}

module.exports.logTable = logTable
module.exports.logObject = logObject
