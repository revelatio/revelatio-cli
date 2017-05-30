
const { deleteKong } = require('../kong')

function deleteApi (name) {
  return deleteKong(`/apis/${name}`)
    .then(() => {
      console.log('Deleted')
    })
    .catch(err => {
      console.log(err.response.data.message)
    })
}

module.exports = program => {
  program
    .command('delete <name>')
    .description('Deletes kong API')
    .action(deleteApi)
}
