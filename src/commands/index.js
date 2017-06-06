const create = require('./create')
const status = require('./status')
const add = require('./add')
const list = require('./list')
const _delete = require('./_delete')
const save = require('./save')

module.exports = program => {
  create(program)
  status(program)
  add(program)
  list(program)
  _delete(program)
  save(program)
}
