#!/usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _package = require('../package.json');

var _index = require('./commands/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version(_package.version);

(0, _index2.default)(_commander2.default);

var cmd = ['create', 'stage'];

_commander2.default.parse(process.argv);
if (_commander2.default.args.length === 0) {
  _commander2.default.help();
}