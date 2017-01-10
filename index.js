#!/usr/bin/env node
'use strict';

const fs = require('fs');

const program = require('commander');
const co = require('co');
const prompt = require('co-prompt');
const chalk = require('chalk');

const version = require('./lib');

const revelatio = require('./lib/template');

const createRevelatioJson = (domain, local, staging) => {

  revelatio.domain          = domain;
  revelatio.stages.live     = domain;
  revelatio.stages.local    = local   || `local-${domain}`;
  revelatio.stages.staging  = staging || `staging-${domain}`;

  fs.writeFile("./revelatio.json", JSON.stringify(revelatio), function(err) {

    if(err) {
      console.log(chalk.bold.red("[-] " + err));
      process.exit(1);
    }

    console.log(chalk.bold.green("[+] The revelatio.json was saved!"));
    process.exit(0);
  });
}

const prettyPrompt = (domain) => {
  //TODO: valid domain

  co(function *() {
    console.log(chalk.bold.blue("[ ] Creating revelatio base project"));
    console.log(chalk.bold.blue(`[ ] v${version}`));

    const local   = yield prompt( chalk.bold.cyan('[*] local domain ') +
                                  chalk.bold.gray(`(local-${domain}):`));

    const staging = yield prompt( chalk.bold.cyan('[*] staging domain ') +
                                  chalk.bold.gray(`(staging-${domain}):`));

    createRevelatioJson(domain, local, staging);
  });
}

program
  .version(version)
  .command('create <domain>')
  .description('Create a revelatio parent project')
  .action((domain) => prettyPrompt(domain));

program.parse(process.argv);
if (program.args.length === 0) {
  program.help();
}
