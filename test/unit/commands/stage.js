import stage, { doStage } from '../../../src/commands/stage'

import expect from 'must'
import sinon from 'sinon'
import mustSinon from 'must-sinon'

mustSinon(expect)

function createMockProgram () {
  const program = {}
  const methods = ['command', 'description', 'action']

  methods.forEach(method => {
    program[method] = sinon.stub().returns(program)
  })

  return program
}

describe('stage', () => {
  it('should hook command', () => {
    const program = createMockProgram()
    stage(program)

    program.command.must.have.been.called()
    program.description.must.have.been.called()
    program.action.must.have.been.called()
  })

  describe('stage ls', () => {
    const cmd = 'ls'
    doStage(cmd)
  })

  describe('stage add', () => {
    const cmd = 'add'
    doStage(cmd)
  })

  describe('stage rm', () => {
    const cmd = 'rm'
    doStage(cmd)
  })
})
