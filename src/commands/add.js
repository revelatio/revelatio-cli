
const { postKong } = require('../kong')

function addApi (name, hosts, upstream, uris) {
  const data = {
    name,
    hosts,
    upstream_url: upstream,
    preserve_host: true,
    strip_uri: false
  }
  if (uris) {
    data.uris = uris
  }

  return postKong('/apis', data)
    .then(api => {
      console.table(api)
    })
    .catch(err => {
      const error = Object.keys(err.response.data)
        .map(key => `${key} ${err.response.data[key]}`)
        .join('\n')

      console.log(error)
    })
}

module.exports = program => {
  program
    .command('add <name> <hosts> <upstream> [uris]')
    .description('Adds kong API')
    .action(addApi)
}
