const { getKong } = require('../kong')
const { logTable } = require('../helper')

function listApis () {
  return getKong('/apis')
    .then(response => {
      const apiList = response.data
        .map(api => ({
          name: api.name,
          hosts: api.hosts,
          upstream_url: api.upstream_url,
          uris: api.uris
        }))
      logTable(apiList)
    })
}

module.exports = {
  listApis,
  list: program => {
    program
      .command('list')
      .description('List APIs')
      .action(listApis)
  }
}
