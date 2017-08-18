const { postKong } = require('../kong')
const { logTable } = require('../helper')

function addKongApi (name, hosts, upstream, uris) {
  const data = {
    name,
    hosts,
    upstream_url: upstream,
    preserve_host: false,
    strip_uri: false
  }

  if (uris) {
    data.uris = uris
  }

  return postKong('/apis', data)
    .then(api => {
      logTable(api)
    })
    .catch(err => {
      const error = Object.keys(err.response.data)
        .map(key => `${key} ${err.response.data[key]}`)
        .join('\n')

      console.log(error)
    })
}

module.exports = {
  addKongApi,
  add: program => {
    program
      .command('add <name> <hosts> <upstream> [uris]')
      .description('Adds kong API')
      .action(addKongApi)
  }
}
