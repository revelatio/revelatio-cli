const { getKong } = require('../kong')

function checkStatus () {
  return getKong('/status')
    .then(stat => {
      console.log('Server')
      console.table(stat.server)
      console.log('Database')
      console.table(stat.database)
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
