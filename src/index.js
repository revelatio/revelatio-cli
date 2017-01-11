#!/usr/bin/env node

import program from 'commander'
import {version} from '../package.json'
import commands from './commands/index'

program
  .version(version)

commands(program)

program.parse(process.argv)
if (program.args.length === 0) {
  program.help()
}
