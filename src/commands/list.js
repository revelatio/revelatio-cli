const { getKong } = require('../kong')

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
      console.table(apiList)
    })
}

module.exports = program => {
  program
    .command('list')
    .description('List APIs')
    .action(listApis)
}
