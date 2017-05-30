const create = require('./create')
const status = require('./status')
const add = require('./add')
const list = require('./list')
const _delete = require('./_delete')

module.exports = program => {
  create(program)
  status(program)
  add(program)
  list(program)
  _delete(program)
}
