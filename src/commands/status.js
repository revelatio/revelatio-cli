const { getKong } = require('../kong')
const { logObject } = require('../helper')

function checkStatus () {
  return getKong('/status')
    .then(stat => {
      console.log('Server')
      logObject(stat.server)
      console.log('Database')
      logObject(stat.database)
    })
}

module.exports = {
  checkStatus,
  status: program => {
    program
      .command('status')
      .description('Check kong status')
      .action(checkStatus)
  }
}
