#!/usr/bin/env node
require('console.table')

const program = require('commander')
const {version} = require('../package.json')
const commands = require('./commands')

program
  .version(version)

commands(program)

program.parse(process.argv)
if (program.args.length === 0) {
  program.help()
}
