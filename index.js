#!/usr/bin/env node
'use strict';

const fs = require('fs');

const program = require('commander');
const co = require('co');
const prompt = require('co-prompt');
const chalk = require('chalk');

const pkg = require('./package');

var revelation = require('./template/revelatio');

let createRevelatioJson = (domain) => {
  revelation.domain = domain;
  fs.writeFile("./revelatio.json", JSON.stringify(revelation), function(err) {

    if(err) {
        return console.log(chalk.bold.red("[-] " + err));
    }

    console.log(chalk.bold.green("[+] The revelatio.json was saved!"));
    process.exit(0);
  });
}

let prettyPrompt = () => {
  co(function *() {
    console.log(chalk.bold.blue("[ ] Creating revelatio base project"));
    console.log(chalk.bold.blue(`[ ] v${pkg.version}`));

    const domain = yield prompt(chalk.bold.cyan('[*] domain: '));
    createRevelatioJson(domain);
  });
}

program
  .version('0.1.0')
  .command('create')
  .description('Create a revelatio parent project')
  .action(prettyPrompt);

program.parse(process.argv);
if (program.args.length === 0) {
  program.help();
}
