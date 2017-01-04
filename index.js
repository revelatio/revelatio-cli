#!/usr/bin/env node
'use strict';

const program = require('commander');

let createRevelatioJson = () => {
  console.log("Create Revelario Json")
}

program
  .version('0.1.0')
  .command('create')
  .description('Create a revelatio parent project')
  .action(createRevelatioJson);

program.parse(process.argv);
if (program.args.length === 0 || !(program.args[0] instanceof Object)) {
  program.help();
}
