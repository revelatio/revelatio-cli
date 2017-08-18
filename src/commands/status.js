const { getKong } = require('../kong')
const { logTable } = require('../helper')

function checkStatus () {
  return getKong('/status')
    .then(stat => {
      console.log('Server')
      logTable(stat.server)
      console.log('Database')
      logTable(stat.database)
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
