#!/usr/bin/env node
const program = require('commander');
const version = require('./package.json').version;
const commands = require('./src/commands');

program
  .version(version);

commands(program);

program.parse(process.argv);
if (program.args.length === 0) {
  program.help();
}
