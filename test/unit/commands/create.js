import create, { createApp } from '../../../src/commands/create';

import expect from 'must';
import sinon from 'sinon';
import mustSinon from 'must-sinon';
import Promise from 'bluebird';
import fs from 'fs-extra';

mustSinon(expect);

const fsStat = Promise.promisify(fs.stat);
const fsRemove = Promise.promisify(fs.remove);

function createMockProgram () {
  const program = {};
  const methods = ['command', 'description', 'action'];

  methods.forEach(method => {
    program[method] = sinon.stub().returns(program);
  });

  return program;
}

describe('create', () => {
  it('should hook command', () => {
    const program = createMockProgram();
    create(program);

    program.command.must.have.been.called();
    program.description.must.have.been.called();
    program.action.must.have.been.called();
  });

  describe('createApp', () => {
    const appName = 'demoapp';

    beforeEach(() => {
      return createApp(appName);
    });

    afterEach(() => {
      return fsRemove(appName);
    });

    it('should create folder', () => {
      return fsStat(appName)
        .then(stats => {
          stats.isDirectory().must.be.true();
        });
    });
  });
});