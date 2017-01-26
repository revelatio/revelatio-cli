'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApp = undefined;

exports.default = function (program) {
  program.command('create <appName>').description('Create a revelat.io app project').action(createApp);
};

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mkdirs = _bluebird2.default.promisify(_fsExtra2.default.mkdirs);
var writeJson = _bluebird2.default.promisify(_fsExtra2.default.writeJson);

function revelatioJson(name) {
  return {
    "name": name,

    "stages": [{
      "name": "dev",
      "domain": '*.' + name + '-dev.com',
      "local": true,
      "live": false
    }, {
      "name": "staging",
      "domain": '*.' + name + '-staging.com',
      "local": false,
      "live": false
    }, {
      "name": "prod",
      "domain": '*.' + name + '.com',
      "local": false,
      "live": true
    }]
  };
}

function createApp(name) {
  return mkdirs(name).then(function () {
    console.log('Created app ' + name);

    writeJson(name + '/.revelatio.json', revelatioJson(name)).then(function () {
      console.log('Created .revelatio.json');
    });
  });
}

exports.createApp = createApp;