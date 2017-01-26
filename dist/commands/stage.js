'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (program) {
  program.command('stage <cmd>').description('Specify the stage action (ls|add|rm)').action(doStage);
};

function doStage(cmd) {
  console.log('Run stage ' + cmd);
}

exports.doStage = doStage;