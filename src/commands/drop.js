const { deleteKong } = require('../kong')

function dropApi (name) {
  return deleteKong(`/apis/${name}`)
    .then(() => {
      console.log('Deleted')
    })
    .catch(err => {
      console.log(err.response.data.message)
    })
}

module.exports = {
  dropApi,
  drop: program => {
    program
      .command('delete <name>')
      .description('Deletes kong API')
      .action(dropApi)
  }
}
