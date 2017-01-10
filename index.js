#!/usr/bin/env node
'use strict';

const fs = require('fs');

const program = require('commander');
const co = require('co');
const prompt = require('co-prompt');
const chalk = require('chalk');

const version = require('./lib');

const revelatio = require('./lib/template/revelatio');

const createRevelatioJson = (domain) => {
  revelatio.domain = domain;
  fs.writeFile("./revelatio.json", JSON.stringify(revelatio), function(err) {

    if(err) {
      console.log(chalk.bold.red("[-] " + err));
      process.exit(1);
    }

    console.log(chalk.bold.green("[+] The revelatio.json was saved!"));
    process.exit(0);
  });
}

const prettyPrompt = () => {
  co(function *() {
    console.log(chalk.bold.blue("[ ] Creating revelatio base project"));
    console.log(chalk.bold.blue(`[ ] v${version}`));

    const domain = yield prompt(chalk.bold.cyan('[*] domain: '));
    createRevelatioJson(domain);
  });
}

program
  .version(version)
  .command('create')
  .description('Create a revelatio parent project')
  .action(prettyPrompt);

program.parse(process.argv);
if (program.args.length === 0) {
  program.help();
}
