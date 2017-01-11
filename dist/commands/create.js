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

function createApp(name) {
  return mkdirs(name).then(function () {
    console.log('Created app ' + name);
  });
}

exports.createApp = createApp;