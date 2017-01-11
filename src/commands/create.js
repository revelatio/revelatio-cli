const fs = require('fs-extra');
const Promise = require('bluebird');

const mkdirs = Promise.promisify(fs.mkdirs);

function createApp (name) {
  return mkdirs(name)
    .then(() => {
      console.log(`Created app ${name}`);
    })
}

module.exports.createApp = createApp;

module.exports = function (program) {
  program
    .command('create <appName>')
    .description('Create a revelat.io app project')
    .action(createApp);
}